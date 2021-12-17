import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Intent } from '../../intent/intent';

@Component({
  selector: 'app-intent-dialog',
  templateUrl: './intent-dialog.component.html',
  styleUrls: ['./intent-dialog.component.scss']
})

export class IntentDialogComponent {
  // Regex for intent-name
  // Ex. animal.cat
  regPattern = /[a-z0-9]+\.[a-z0-9]+/;

  constructor(
    public dialogRef: MatDialogRef<IntentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Intent,
  ) { }

  // Abort of the dialog
  onNoClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }

  /**
   * Checks if every field has some input
   * @returns false when all fields are filled
   * @returns true when a field is missing
   */
  checkTextFields(): boolean {
    if (this.data.intent === '') return true;
    // Check Regex
    if (!this.regPattern.test(this.data.intent)) return true;
    if (this.data.utterances[0] === '') return true;
    if (this.data.answers[0] === '') return true;
    return false;
  }
}
