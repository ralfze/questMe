
import { E } from '@angular/cdk/keycodes';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, Injectable, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
// TREE
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
// END TREE
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../api.service';
import { Corpus } from '../corpus';
import { Intent } from '../intent';


/**
 * Node for to-do item
 */
export class CorpusItemNode {
  children!: CorpusItemNode[];
  item!: string;
}

/** Flat to-do item node with expandable and level information */
export class CorpusItemFlatNode {
  item!: string;
  level!: number;
  expandable!: boolean;
}

/**
 * The Json object for to-do list data.
 */
let CORPUS_TREE_DATA = {
  intent: "agent.age",
  utterances: [
    "was ist dein alter",
    "wie alt ist deine plattform",
    "wie alt bist du",
    "was it dein alter",
    "ich möchte dein alter kennen",
    "sag mir dein alter"
  ],
  answers: [
    "Ich bin sehr jung",
    "Ich wurde vor kurzem kreiert",
    "Das Alter ist nur eine Zahl. Du bist so alt wie du dich fühlst"
  ]
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {


  // fetched corpus
  corpus: Corpus | undefined;
  intents: Intent[] = [];

  dataChange = new BehaviorSubject<CorpusItemNode[]>([]);

  get data(): CorpusItemNode[] {
    return this.dataChange.value;
  }

  constructor(private apiService: ApiService,) {
    this.initialize();
  }

  initialize() {
    // fetch the corpus first
    this.refreshCorpus();

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(CORPUS_TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): CorpusItemNode[] {
    return Object.keys(obj).reduce<CorpusItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new CorpusItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: CorpusItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as CorpusItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: CorpusItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
  // REST API
  refreshCorpus() {
    this.apiService.getCorpus().subscribe(data => {
      console.log(data)
      this.corpus = data;
      this.refreshIntents(data.data);
    })
  }
  refreshIntents(intents: Intent[]) {
    this.intents = intents;
    // Refresh the tree
    intents.forEach((intent) => {
      console.log(intent);
      CORPUS_TREE_DATA = { intent: intent.intent, utterances: intent.utterances, answers: intent.answers };
    })
  }


  // END REST API

}
/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-korpus',
  templateUrl: './korpus.component.html',
  styleUrls: ['./korpus.component.scss'],
  providers: [ChecklistDatabase],
})

export class KorpusComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CorpusItemFlatNode, CorpusItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<CorpusItemNode, CorpusItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: CorpusItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<CorpusItemFlatNode>;

  treeFlattener: MatTreeFlattener<CorpusItemNode, CorpusItemFlatNode>;

  dataSource: MatTreeFlatDataSource<CorpusItemNode, CorpusItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<CorpusItemFlatNode>(true /* multiple */);

  webtitle = 'Admin Korpus';

  titleC = 'Korpus-Liste';

  selected = 'basis';



  // intents stores utterance and answers
  intents: Intent[] = [];

  utterances: any[] = [];
  answers: any[] = [];

  // div Element to store intents
  // @ViewChild('intentlist', { static: false }) divIntentList!: ElementRef;

  addUtterance(item: string) {
    if (item !== "") {
      //this.utterances.push({ id: this.utterances.length, name: item })
      console.log(item);
    } else {
      console.log("No given String!");
    }
    //console.warn(this.utterances);

  }
  removeUtterance(id: number) {
    //this.utterances = this.utterances.filter(item => item.id !== id);
    //console.warn(id)
  }

  addAnswer(item: string) {
    if (item !== "") {
      //this.answers.push({ id: this.answers.length, name: item })
    } else {
      console.log("No given String!");
    }
    //console.warn(this.answers);
  }

  removeAnswer(id: number) {
    // this.answers = this.answers.filter(item2 => item2.id !== id);
    //console.warn(id);
  }



  constructor(private title: Title, private keycloakService: KeycloakService, private renderer: Renderer2, private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<CorpusItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
    // Sets title of the webpage
    this.title.setTitle(this.webtitle);
  }
  getLevel = (node: CorpusItemFlatNode) => node.level;

  isExpandable = (node: CorpusItemFlatNode) => node.expandable;

  getChildren = (node: CorpusItemNode): CorpusItemNode[] => node.children;

  hasChild = (_: number, _nodeData: CorpusItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: CorpusItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: CorpusItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new CorpusItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: CorpusItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CorpusItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: CorpusItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: CorpusItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CorpusItemFlatNode): void {
    let parent: CorpusItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: CorpusItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: CorpusItemFlatNode): CorpusItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: CorpusItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: CorpusItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }


  /*
  updateIntentArray(intent: Intent) {
    intent.utterances.forEach((utterance) => {
      this.addUtterance(utterance);
    });
    intent.answers.forEach((answer) => { this.addAnswer(answer) });

  }*/

  //generateIntentCards() {
  /*
      this.intents.forEach((intent)=>{
        this.createIntentCard(intent);
      })*/
  //  this.createIntentCard(this.intents[1]);

  //  }
  /*
    createIntentCard(intent: Intent) {
      // Card holds all intent information
      const matCard = this.renderer.createElement('mat-card');
      this.renderer.addClass(matCard, 'intent-card');

      // Card holds lists intent and utterances
      const matContainer = this.renderer.createElement('mat-card');
      this.renderer.addClass(matContainer, 'intent-container');

      // Intent Text and component
      const intentDiv = this.renderer.createElement('mat-card');
      this.renderer.addClass(intentDiv, 'intent-intent');
      // gets the index in intent Array
      this.renderer.setAttribute(intentDiv, 'id', '' + this.intents.indexOf(intent));
      const intentText = this.renderer.createText(intent.intent);
      this.renderer.appendChild(intentDiv, intentText);

      // List holds utterances
      const utteranceList = this.renderer.createElement('mat-action-list');
      this.renderer.addClass(utteranceList, 'intent-utterances-list');

      // Create utterance mat-list
      intent.utterances.forEach((utterance) => {
        const matListItem = this.renderer.createElement('mat-list-item');
        // sets id for each utterance
        this.renderer.setAttribute(matListItem, 'id', '' + intent.utterances.indexOf(utterance));

        const text = this.renderer.createText(utterance);
        this.renderer.appendChild(matListItem, text);
        this.renderer.appendChild(utteranceList, matListItem);
      })
      this.renderer.appendChild(utteranceList,this.simple);

      // List holds answers
      const answersList = this.renderer.createElement('mat-action-list');
      this.renderer.addClass(answersList, 'intent-answers-list');

      intent.answers.forEach((answer) => {
        const matListItem = this.renderer.createElement('mat-list-item');
        // sets id for each utterance
        this.renderer.setAttribute(matListItem, 'id', '' + intent.answers.indexOf(answer));

        const text = this.renderer.createText(answer);
        this.renderer.appendChild(matListItem, text);
        this.renderer.appendChild(answersList, matListItem);
      })

      // Append intent Div
      this.renderer.appendChild(matCard, intentDiv);



      // Container for Input Form
      // Container for Input Utterance
      const inputUtterances = this.renderer.createElement('mat-card');
      this.renderer.addClass(inputUtterances, 'intent-input-utterances');
      // Input Field Answers
      const utteranceField = this.renderer.createElement('input');
      this.renderer.addClass(utteranceField, 'utterances-field');
      this.renderer.setAttribute(utteranceField, 'type', 'text');
      this.renderer.appendChild(inputUtterances, utteranceField);
      // Button Utterance
      const butAddUtterances = this.renderer.createElement('button');
      this.renderer.addClass(butAddUtterances, 'butAddUtterances');
      this.renderer.appendChild(butAddUtterances, this.renderer.createText("Frage hinzufügen"));
      this.renderer.listen(butAddUtterances, 'click', evt => {
        // Add an untterance
        console.log("hello");
      })
      // Add the button to the component
      this.renderer.appendChild(inputUtterances, butAddUtterances);

      // Container for Input Answers
      const inputAnswers = this.renderer.createElement('mat-card');
      this.renderer.addClass(inputAnswers, 'intent-input-answers');
      // Input Field Answers
      const answersField = this.renderer.createElement('input');
      this.renderer.addClass(answersField, 'answers-field');
      this.renderer.setAttribute(answersField, 'type', 'text');
      this.renderer.setAttribute(answersField, 'ngModel', 'input');
      this.renderer.appendChild(inputAnswers, answersField);
      // Button Answers
      const butAddAnswers = this.renderer.createElement('button');
      this.renderer.addClass(butAddAnswers, 'butAddAnswers');
      this.renderer.setAttribute(butAddAnswers, 'ng-click', "addAnswer('Hello')");
      this.renderer.appendChild(butAddAnswers, this.renderer.createText("Antwort hinzufügen"));
      this.renderer.listen(butAddAnswers, 'click', evt => {
        // Add an answer
        console.log(evt);
        // get the input string
        let input = evt.path[1].getElementsByClassName('answers-field');
        console.log(input.value);
      })

      // Add the button to the component
      this.renderer.appendChild(inputAnswers, butAddAnswers);
      // END Container for Input Form


      // Append List component containing input form
      this.renderer.appendChild(utteranceList, inputUtterances);
      this.renderer.appendChild(answersList, inputAnswers);

      // Append List utternaces/answers to matComponent
      this.renderer.appendChild(matContainer, utteranceList);
      this.renderer.appendChild(matContainer, answersList);

      // Append Component Box to matCard
      this.renderer.appendChild(matCard, matContainer);

      // Append created matCard to intentList
      this.renderer.addClass(matCard, 'intent-card');
      this.renderer.appendChild(this.divIntentList.nativeElement, matCard);
    }
    insertIntentCard() {
      const text = this.renderer.createText(this.intents[0].intent);
      this.renderer.appendChild(this.divIntentList.nativeElement, text);
    }
    updateIntents(corpus: Corpus) {
      this.intents = corpus.data;
      // Create Intent cards on the page
      //this.generateIntentCards();
    }
  */

  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }

}
