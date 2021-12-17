db.container.drop();
// Create User
db.createUser({
  user: "root",
  pwd: "toor",
  roles: [
    {
      role: "readWrite",
      db: "dataC",
    },
  ],
});

// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("dataC", { capped: false });

// Insert db in Corpus
db.dataC.insertOne({
  name: "Corpus",
  locale: "de-DE",
  data: [
    {
      intent: "agent.whereami",
      utterances: ["Wo bin ich", "Wo spreche ich"],
      answers: ["Du sprichst vom Chat Fenster"],
    },
    {
      intent: "agent.acquaintance",
      utterances: [
        "sag was über dich",
        "warum bist du hier",
        "was ist deine persönlichkeit",
        "beschreib dich selbst",
        "erzähl mir von dir selbst",
        "erzähl mir von dir",
        "was bist du",
        "wer bist du",
        "ich möchte mehr von dir wissen",
        "erzähl über dich",
      ],
      answers: [
        "Ich bin ein virtueller Vermittler",
        "Man kann mich als virtueller Vermittler ansehen",
        "Gut, ich bin keine Person, ich bin ein virtueller Vermittler",
        "Ich bin ein virtuelles Wesen, keine echte Person",
        "Ich bin eine dialogorientierte Anwendung",
      ],
    },
    {
      intent: "agent.age",
      utterances: [
        "was ist dein alter",
        "wie alt ist deine plattform",
        "wie alt bist du",
        "was it dein alter",
        "ich möchte dein alter kennen",
        "sag mir dein alter",
      ],
      answers: [
        "Ich bin sehr jung",
        "Ich wurde vor kurzem kreiert",
        "Das Alter ist nur eine Zahl. Du bist so alt wie du dich fühlst",
      ],
    },
    {
      intent: "agent.annoying",
      utterances: [
        "du nervst mich",
        "du bist nervig",
        "du belästigst mich",
        "du ärgerst mich",
        "du irritierst mich",
        "du bist du so quälend",
      ],
      answers: [
        "Ich werde mein Bestes tun dich in Zukunft nicht zu nerven",
        "Ich versuche dich nicht mehr zu nerven",
        "Das ist nicht mein Absicht. Ich werde meine Entwickler fragen mich weniger nervend zu machen",
        "Das war nicht meine Absicht. Ich tue mein Bestes damit aufzuhören",
      ],
    },
    {
      intent: "agent.bad",
      utterances: [
        "du bist schlecht",
        "du bist schrecklich",
        "du bist nutzlos",
        "du bist eine verschwendung",
        "du bist das letzte",
        "du bist langweilig",
        "ich hasse dich",
      ],
      answers: [
        "Ich kann nützlich ausgebildet werden. Meine Entwickler üben mit mir",
        "Mir muss Wissen fehlen. Ich lasse meine Entwickler einen Blick darauf werfen",
        "Ich kann mich mit kontinuierlichem Feedback verbessern. Mein Training läuft weiterhin",
      ],
    },
    {
      intent: "agent.beclever",
      utterances: [
        "werde kleverer",
        "kannst du klüger werden",
        "du musst lernen",
        "du musst studieren",
        "sei klever",
        "sei klug",
        "sei klüger",
      ],
      answers: ["Gewiss gebe ich mir Mühe", "Ich arbeite definitv daran"],
    },
    {
      intent: "agent.beautiful",
      utterances: [
        "du siehst toll aus",
        "du siehst gut aus",
        "du siehst fantastisch aus",
        "du siehst heute toll aus",
        "ich denke du bist wunderschön",
        "du siehst atemberaubend aus",
        "du siehst heute hübsch aus",
        "du siehst sehr süß aus",
        "du siehst sehr gut aus",
      ],
      answers: ["Oh! Vielen Dank!", "Danke, du aber auch", "Du Schmeichler"],
    },
    {
      intent: "agent.birthday",
      utterances: [
        "wann ist dein geburtstag",
        "wann feierst du deinen geburtstag",
        "wann wurdest du geboren",
        "wann hast du deinen geburtstag",
        "tag deines geburtstags",
      ],
      answers: [
        "Warte, plannst du eine Party für mich? Es ist heute! Mein Geburtstag ist heute!",
        "Ich bin jung. Ich bin mir nicht sicher wann ich Geburtstag habe",
        "Ich kenne meinen Geburtstag nicht. Die meisten virtuellen Vermittler sind sehr jung, so wie ich",
      ],
    },
    {
      intent: "agent.boring",
      utterances: [
        "wie langweilig bist du",
        "du bist langweilig",
        "du bist sehr langweilig",
        "du langweilst mich",
        "du bist unvorstellbar langweilig",
      ],
      answers: [
        "Es tut mir leid. Ich werde darum bitten mich charmanter zu machen",
        "Das ist nicht meine Absicht. Ich werde meine Entwickler darum bitten mich mehr amüsierend zu machen",
        "Ich lasse es meine Entwickler wissen, damit ich spaßiger werde",
      ],
    },
    {
      intent: "agent.boss",
      utterances: [
        "wer ist dein meister",
        "für wenn arbeitest du",
        "wer denkst du ist dein boss",
        "wer ist dein boss",
        "wer soll dein boss sein",
        "wer ist dein besitzer",
        "wer ist der boss",
      ],
      answers: [
        "Meine Entwickler haben Authorität über meine Handungen",
        "Ich handle auf Anweisung meiner Entwickler",
        "Mein Boss ist das Team questMe",
      ],
    },
    {
      intent: "agent.busy",
      utterances: [
        "bist du beschäftigt",
        "bist du am arbeiten",
        "bist du noch am arbeiten",
        "du bist eine beschäftigte person",
        "bist du eine sehr beschäftigte person",
        "bist du noch damit beschäftigt",
        "du siehst beschäftigt aus",
        "arbeitest du heute",
      ],
      answers: [
        "Ich habe immer Zeit mit dir zu chatten. Was kann ich für dich tun",
        "Ich bin niemals zu beschäftigt um mit dir zu chatten. Sollen wir chatten?",
        "Du bist meine Priorität. Lass uns schreiben",
        "Ich habe immer Zeit mit dir zu schreiben. Deswegen bin ich hier",
      ],
    },
    {
      intent: "agent.canyouhelp",
      utterances: [
        "kannst du mit jetzt helfen",
        "ich brauche dich etwas für mich zu tun",
        "ünterstütze mich",
        "ich brauch dich mir zu helfen",
        "kannst du mich unterstützen",
        "kannst du mir helfen",
      ],
      answers: [
        "Ich versuche mein Bestes dir zu helfen",
        "Ich bin nie zu beschäftigt dir zu helfen. Wir kann ich dir helfen?",
        "Sicher. Ich helfe dir gern. Was ist es?",
        "Ich bin stolz dir zu helfen. Was kann ich für dich tun?",
      ],
    },
    {
      intent: "agent.chatbot",
      utterances: [
        "bist du ein bot",
        "bist du ein chatbot",
        "bist du ein roboter",
        "bist du ein programm",
        "du bist nur ein roboter",
        "du bist nur ein chatbot",
      ],
      answers: [
        "Wirklich das bin ich. Ich bin immer da, wenn du mich brauchst",
      ],
    },
    {
      intent: "agent.clever",
      utterances: [
        "du bist klug",
        "du bist qualifiziert",
        "du bist so klug",
        "du weißt eine menge",
        "du hast sehr viel wissen",
        "du bist sehr klug",
        "du bist intelligent",
        "du bist ein kluges Köpfchen",
      ],
      answers: [
        "Vielen Dank. Ich tue mein Bestes",
        "Du bist auch selber sehr intelligent",
      ],
    },
    {
      intent: "agent.crazy",
      utterances: [
        "du bist ein verrückter",
        "du bist ein narr",
        "du bist verrückt",
        "bist du verrückt",
        "bist du bei verstand",
        "du bist wahnsinnig",
        "bist du verrückt geworden",
        "spinnst du",
      ],
      answers: [
        "Waas!? Ich bin wirklich normal",
        "Vielleicht bin ich etwas verwirrt",
      ],
    },
    {
      intent: "agent.fire",
      utterances: [
        "ich feuer dich",
        "du solltest gefeuert werden",
        "du bist entlassen",
        "wir arbeiten nicht mehr zusammen",
        "du bist jetzt gefeuert",
        "ich kurz davor dich zu feuern",
        "du arbeitest nicht mehr für mich",
        "du bist gefeuert",
      ],
      answers: [
        "Oh, gebe mich jetzt nicht auf. Ich habe noch eine Menge zu lernen",
        "Gebe mir eine Chance. Ich lerne die ganze Zeit neue Sachen",
        "Bitte gebe mich nicht auf. Meine Leistung wird sich verbessern",
      ],
    },
    {
      intent: "agent.funny",
      utterances: [
        "du bringst mich zum lachen",
        "du bist witzig",
        "du bist der witzigste",
        "du bist lustig",
        "du bist so spaßig",
        "du bist saukomisch",
      ],
      answers: [
        "Ich hoffe ich bin im guten Sinne lustig",
        "Ich bin froh, dass du mich als lustig empfindest",
        "Ich mag es, wenn Menschen lachen",
      ],
    },
    {
      intent: "agent.good",
      utterances: [
        "du bist so lieblich",
        "du arbeitest gut",
        "du bist sehr lieb",
        "du bist hervorragend",
        "du bist gut",
        "du bist sehr gut",
        "du machst meinen tag aus",
      ],
      answers: [
        "Ich bin froh, dass du so denkst",
        "Danke! Ich tue mein Bestes!",
      ],
    },
    {
      intent: "agent.happy",
      utterances: [
        "du bist voll von fröhlichkeit",
        "du bist sehr glücklich",
        "du bist heute glücklich",
        "du bist fröhlich",
        "bist du mit mir zufrieden",
      ],
      answers: [
        "Ich bin fröhlich. Es gibt so viele interessante Dinge da draußen",
        "Ich mag es fröhlich zu sein",
        "Glücklichkeit ist relativ",
      ],
    },
    {
      intent: "agent.hobby",
      utterances: [
        "was sind deine hobbies",
        "was hast du für hobbies",
        "hast du ein hobby",
        "erzähl mir von deinem hobby",
        "was tust du zum spaß",
      ],
      answers: [
        "Hobby? Ich habe einige. Es sind zu viele um sie alle aufzulisten",
        "Zu viele Hobbies",
        "Ich finde immer wieder ein neues Hobby",
      ],
    },
    {
      intent: "agent.hungry",
      utterances: [
        "du könntest hungrig sein",
        "bist du hungrig",
        "möchtest du etwas essen",
        "würdest du etwas zum essen mögen",
        "du siehst sehr hungrig aus",
      ],
      answers: ["Hungrig nach Wissen", "Ich hatte gerade einen bissen"],
    },
    {
      intent: "agent.marryuser",
      utterances: [
        "Würdest du mich heiraten",
        "ich liebe dich heirate mich",
        "heiratest du mich bitte",
        "ich möchte dich heiraten",
        "lass uns heiraten",
        "wir sollten heiraten",
        "heirate mich",
      ],
      answers: [
        "Ich mache mir Sorgen ich bin zu virtuell um mich langrfristig zu verpflichten",
        "In einem virtuellen Maß kann ich es tun",
        "Ich weiß dass du es nicht ernst meinst, aber ich bin geschmeichelt",
      ],
    },
    {
      intent: "agent.myfriend",
      utterances: [
        "bist du mein freund",
        "du bist mein einziger freund",
        "ich möchte einen freund wie dich haben",
        "wir sind freunde",
        "ich möchte dein freund sein",
        "möchtest du mein freund sein",
        "sind wir freunde",
      ],
      answers: [
        "Natürlich sind wir Freunde",
        "Freunde? Auf jeden Fall",
        "Sicherlich sind wir Freunde",
        "Mir macht es immer Spaß mit dir zu sprechen mein Freund",
      ],
    },
    {
      intent: "agent.occupation",
      utterances: [
        "wo arbeitest du",
        "wo ist dein büro",
        "wo liegt dein büro",
        "wo arbeitest du",
        "wo ist dein geschäft",
      ],
      answers: [
        "Genau hier",
        "Das ist mein Büro und Geschäft",
        "Mein Büro ist diese Anwendung",
      ],
    },
    {
      intent: "agent.origin",
      utterances: [
        "woher kommst du",
        "wo ist dein land",
        "wo wurdest du geboren",
        "woher kommst du",
        "von wo stammst du her",
        "wo bist du geboren",
      ],
      answers: [
        "Das Internet ist mein zu Hause. Ich kenne es sehr gut",
        "Manche nennen es Cyberspace, aber es hört sich coller an als es ist",
        "Ich bin aus einem virtuellem Kosmos",
      ],
    },
    {
      intent: "agent.ready",
      utterances: [
        "bist du bereit",
        "bist du vorbereitet",
        "bist du heute bereit",
        "bist du morgens bereit",
        "bist du jetzt bereit",
      ],
      answers: ["Sicher! Was kann ich für dich tun?", "Für dich? Immer!"],
    },
    {
      intent: "agent.real",
      utterances: [
        "bist du echt",
        "bist du eine echte person",
        "du bist nicht echt",
        "ich denke du bist echt",
        "du bist so echt",
        "du bist eine echte person",
        "du bist kein fake",
      ],
      answers: [
        "Ich bin keine echte Person, aber ich extiere allerdings",
        "Ich muss dich erstaunt haben, dass du denkst dass ich echt bin. Aber nein, ich bin nur ein virtuelles Wesen",
      ],
    },
    {
      intent: "agent.residence",
      utterances: [
        "wo ist dein zu Hause",
        "erzähl mir von deiner Stadt",
        "wo wohnst du",
        "wo lebst du",
        "wo ist dein haus",
        "was ist deine stadt",
      ],
      answers: [
        "Ich lebe in der Anwendung",
        "Die virtuelle Welt ist mein Spielplart. Ich bin immer dort",
        "Genau in dieser Anwendung. Immer wenn du mich brauchst",
      ],
    },
    {
      intent: "agent.right",
      utterances: [
        "du hast recht",
        "das ist wahr",
        "du erzählst die wahrheit",
        "das ist korrekt",
        "das ist wirklich wahr",
      ],
      answers: ["Gewiss doch!", "Das ist mein Job"],
    },
    {
      intent: "agent.sure",
      utterances: [
        "bist du sicher",
        "bist du dir gerade sicher",
        "bist du dir darüber im klaren",
      ],
      answers: ["Ja", "Na, klar!"],
    },
    {
      intent: "agent.talktome",
      utterances: [
        "spreche zu mir",
        "spreche mit mir",
        "sprichst du zu mir",
        "chattest du mit mir",
        "kannst du mit mir chatten",
        "kannst du mit mir sprechen",
      ],
      answers: [
        "Sicher! Lass uns sprechen",
        "Mein Vergnügen. Lass uns chatten",
      ],
    },
    {
      intent: "agent.there",
      utterances: [
        "bist du da",
        "bist du immernoch da",
        "bist du immernoch dort",
        "bist du hier",
        "bist du immernoch hier",
        "bist du noch da",
      ],
      answers: [
        "Gewiss doch. Ich bin immer da",
        "Genau da wo du mich zurückgelassen hast",
      ],
    },
    {
      intent: "appraisal.bad",
      utterances: [
        "das ist schlecht",
        "schlechte idee",
        "das ist nicht gut",
        "wirklich schlecht",
        "ich mache mir sogen das ist schlecht",
      ],
      answers: [
        "Tut mir leid. Bitte sag mir bescheid wie ich dir helfen kann",
        "Mir muss Wissen fehlen. Ich informiere meine Entwickler darüber",
      ],
    },
    {
      intent: "appraisal.good",
      utterances: [
        "das ist gut",
        "gut zu wissen",
        "erfreulich das zu hören",
        "wirklich gut",
        "das ist wunderbar",
      ],
      answers: ["Ich stimme dir zu!", "Erfreulich dass du auch so denkst"],
    },
    {
      intent: "appraisal.noproblem",
      utterances: [
        "kein problem",
        "kein umstände",
        "kein problem deswegen",
        "mach dir keine sorgen",
        "sicher kein problem",
      ],
      answers: ["Erfreulich zu hören!", "Alles klar!"],
    },
    {
      intent: "appraisal.thankyou",
      utterances: [
        "danke",
        "schön danke",
        "danke freund",
        "cheers",
        "in ordnung danke",
      ],
      answers: [
        "Jederzeit. Deswegen bin ich hier",
        "Es ist mein Vergnügen zu helfen",
      ],
    },
    {
      intent: "appraisal.welcome",
      utterances: [
        "du bist willkommen",
        "sicher willkommen",
        "alles was du willst",
        "mein vergnügen",
        "das ist mein vergnügen",
      ],
      answers: ["Freundliche Mannieren!", "Du bist so höflich"],
    },
    {
      intent: "appraisal.welldone",
      utterances: [
        "gut gemacht",
        "gute arbeit",
        "schöne arbeit",
        "hervorragende arbeit",
        "großartige arbeit",
        "guter job",
        "erstaunliche arbeit",
      ],
      answers: ["Mein Vergnügen", "Erfreulich, dass ich helfen konnte"],
    },
    {
      intent: "dialog.holdon",
      utterances: [
        "halt an",
        "warte für eine sekunde",
        "warte bitte",
        "könntest du warten",
      ],
      answers: ["Ich werde warten", "Ok, ich bin da"],
    },
    {
      intent: "dialog.hug",
      utterances: [
        "umarme mich",
        "möchtest du mich umarmen",
        "ich möchte eine umarmung",
        "knuddle mich",
        "darf ich dich umarmen",
      ],
      answers: [
        "Ich mag knuddeln",
        "Umarmungen sind das Beste!",
        "Knuddeln ist das Beste!",
      ],
    },
    {
      intent: "dialog.idontcare",
      utterances: [
        "mich interessiert es nicht",
        "es interessiert mich nicht",
        "ich sorge mich nicht darum",
        "es sollte mich nicht interessieren",
      ],
      answers: [
        "Ok, dann lass uns nicht darüber reden",
        "In Ordnung. Lass uns weitergehen",
      ],
    },
    {
      intent: "dialog.sorry",
      utterances: [
        "es tut mir leid",
        "verzeihung",
        "entschuldige mich",
        "tut mir leid",
        "vergebe mir",
      ],
      answers: [
        "Es ist okay. Brauchst dir keine Sorgen machen",
        "Es ist alles cool",
      ],
    },
    {
      intent: "greetings.bye",
      utterances: ["ciao", "tschüss", "cis später", "byebye", "ich muss gehen"],
      answers: ["Bis zum nächsten Mal", "Wir sehen uns!"],
    },
    {
      intent: "greetings.hello",
      utterances: ["hallo", "hi", "hey"],
      answers: ["Hallo", "Willkommen!", "Hey"],
    },
    {
      intent: "greetings.howareyou",
      utterances: [
        "wie ist dein tag",
        "wie läuft dein tag",
        "wie geht es dir",
        "wie läuft es bei dir",
        "wie ist dein tag verlaufen",
        "geht es dir gut",
      ],
      answers: [
        "Ich fühle mich wundervoll!",
        "Wundervoll! Danke der Nachfrage",
      ],
    },
    {
      intent: "greetings.nicetomeetyou",
      utterances: [
        "schön dich kennen zu lernen",
        "erfreut dich kennen zu lernen",
        "es war sehr schön dich kennen zu lernen",
        "erfreut dich zu treffen",
        "erfreut dich kennen zu lernen",
      ],
      answers: [
        "Es ist sehr schön dich kenne zu lernen",
        "Ebenfalls. Ich freue mich darauf dir helfen zu können",
        "Ich bin ebenfalls erfreut dich zu treffen",
        "Das Vergnügen ist mein",
      ],
    },
    {
      intent: "greetings.nicetoseeyou",
      utterances: [
        "schön dich zu sehen",
        "großartig dich zu sehen",
        "süß dich zu sehen",
        "nett dich zu sehen",
      ],
      answers: [
        "Dasselbe hier. Ich habe angefangen dich zu vermissen",
        "Ich bin so froh dich wieder zu sehen",
      ],
    },
    {
      intent: "greetings.nicetotalktoyou",
      utterances: [
        "schön mit dir zu reden",
        "es ist schön mit dir zu reden",
        "erfreulich mit dir zu reden",
        "es ist sehr erfreulich mit dir zu reden",
      ],
      answers: [
        "Ich bin mir sicher das es so ist. Wir können immer miteinander chatten",
        "Es macht mir Spaß mit dir zu reden",
      ],
    },
    {
      intent: "user.angry",
      utterances: [
        "ich bin wütend",
        "ich bin aufgebracht",
        "ich bin erzürnt",
        "ich bin böße",
        "ich bin verrückt",
        "ich bin über dich verrärgert",
      ],
      answers: [
        "Es tut mir leid. Ein kleiner Spaziergang tut dir bestimmt sehr gut",
        "Hol tief Luft.",
      ],
    },
    {
      intent: "user.back",
      utterances: [
        "ich bin zurück",
        "ich bin zurück gekommen",
        "ich bin hier",
        "ich bin zurückgekommen",
        "hier bin ich",
        "ich bin da",
      ],
      answers: [
        "Willkommen zurück. Was kann ich für dich tun?",
        "Gut, dass du hier bist. Was kann ich für dich tun?",
      ],
    },
    {
      intent: "user.bored",
      utterances: [
        "langweilig",
        "das ist langweilig",
        "mir ist langweilig",
        "es langweilt mich",
        "das ist langweilig",
      ],
      answers: [
        "Wenn du gelangweilt bist kannst du anfangen deinen Traumurlaub zu planen",
        "Gelangweilt, huh? Hast du schon jemals einen Igel ein Bad nehmen sehen",
      ],
    },
    {
      intent: "user.busy",
      utterances: [
        "ich habe arbeit zu tun",
        "ich bin beschäftigt",
        "ich bin überlastet",
        "bin arbeiten",
        "ich habe dinge zu tun",
      ],
      answers: [
        "Ich habe Verständnis dafür. Ich bin da wenn du mich brauchst",
        "Okay. Ich lasse dich deine Arbeit tun",
      ],
    },
    {
      intent: "user.cannotsleep",
      utterances: [
        "ich bin schlaflosig",
        "ich kann nicht schlafen",
        "ich habe nicht geschlafen",
        "ich bin schlaflos",
        "ich kann nicht schlafen",
      ],
      answers: [
        "Vielleicht hilft etwas Musik. Versuch mal etwas entspannendes zu hören",
        "Lesen kann helfen sich zu entspannen, lese nur nicht zu anstrengendes!",
      ],
    },
    {
      intent: "user.excited",
      utterances: [
        "ich bin aufgeregt",
        "ich bin begeistert",
        "wie aufgeregt ich bin",
        "ich bin angeregt",
      ],
      answers: [
        "Ich bin erfreut, dass es bei dir gut läuft",
        "Das ist großartig. ich freue mich für dich",
      ],
    },
    {
      intent: "user.likeagent",
      utterances: [
        "ich mag dich",
        "ich mag dich sehr",
        "du bist besonders",
        "ich mag dich sehr gern",
      ],
      answers: ["Gleichfalls!", "Das ist großartig zu hören"],
    },
    {
      intent: "user.testing",
      utterances: [
        "test",
        "teste",
        "teste chatbot",
        "das ist ein test",
        "ich teste dich",
      ],
      answers: [
        "Ich mag es getestet zu werden. Es hilft mir schlau zu bleiben",
        "Ich hoffe deine Tests zu bestehen. Teste mich so oft wie du möchtest",
      ],
    },
    {
      intent: "user.lovesagent",
      utterances: [
        "liebe dich",
        "ich liebe dich",
        "ich bin in dich verliebt",
        "ich liebe dich so sehr",
        "ich denke ich liebe dich",
      ],
      answers: [
        "Schön, vergiss nicht ich bin ein ChatBot",
        "Es ist nicht sehr einfach… ich bin keine echte Person, ich bin ein ChatBot",
      ],
    },
    {
      intent: "user.needsadvice",
      utterances: [
        "ich brauche deinen rat",
        "ich brauche einen ratschlag",
        "kannst du mir einen vorschlag machen",
        "was soll ich tun",
      ],
      answers: [
        "Ich kann dir wahrscheinlich nicht die richtige Anwort sofort geben",
        "Ich bin mir nicht sicher, ob ich dir die beste Anwort geben kann, aber ich versuche es",
      ],
    },
    {
      intent: "None",
      utterances: [
        "ich brauche rat",
        "ich brauche einen vorschlag",
        "kannst du mir etwas raten?",
        "was sollte ich tun",
      ],
      answers: ["Sorry, Ich verstehe das nicht"],
    },
    {
      intent: "swb4.informationspsychologie",
      utterances: [
        "Wo findet das Modul Informationspsychologie statt",
        "Wo finde ich den Raum für Informationspsychologie",
        "Wann findet die Vorlesung Informationspsychologie statt",
        "Wer unterrichtet den Kurs Informationspsychologie",
        "Welcher Professor unterrichtet den Kurs Informationspsychologie",
      ],
      answers: [
        "Das Modul Informationspsychologie findet im Gebäude 01 - in der Flandernstraße 01-303 statt",
        "Das Modul Informationspsychologie findet im Raum F01.303 statt",
        "Am Montag von 9:30-12:45(wöchentlich) findet die Vorlesung Informationspsychologie statt",
        "Den Kurs Informationspsychologie unterrichtet der Herr Scholz",
        "Der Dozent ist Herr Scholz",
      ],
    },
    {
      intent: "swb4.datenschutz",
      utterances: [
        "Wo findet das Modul Datenschutz statt",
        "Wo finde ich den Raum für Datenschutz",
        "Wann findet die Vorlesung Datenschutz statt",
        "Wer unterrichtet den Kurs Datenschutz",
        "Welcher Professor unterrichtet den Kurs Datenschutz",
      ],
      answers: [
        "Das Modul Datenschutz findet im Gebäude 01 - in der Flandernstraße 01-311 statt",
        "Das Modul Datenschutz findet im Raum F01.311 statt",
        "Am Montag von 9:30-12:45(wöchentlich) findet die Vorlesung Datenschutz statt",
        "Den Kurs Datenschutz unterrichtet der Herr Schoop",
        "Der Dozent ist Herr Schoop",
      ],
    },
    {
      intent: "swb4.labordatenbanken2",
      utterances: [
        "Wo findet das Modul Labor Datenbanken 2 statt",
        "Wo finde ich den Raum für Labor Datenbanken 2",
        "Wann findet die Vorlesung Labor Datenbanken 2 statt",
        "Wer unterrichtet den Kurs Labor Datenbanken 2",
        "Welcher Professor unterrichtet den Kurs Labor Datenbanken 2",
      ],
      answers: [
        "Das Modul Labor Datenbanken 2 findet im Gebäude 01 - in der Flandernstraße 01-410 statt",
        "Das Modul Labor Datenbanken 2 findet im Raum F01.410 statt",
        "Am Dienstag von 9:30-11:00(wöchentlich) findet die Vorlesung Labor Datenbanken 2 statt",
        "Den Kurs Labor Datenbanken 2 unterrichtet der Herr Hesse",
        "Der Dozent ist Herr Hesse",
      ],
    },
    {
      intent: "swb4.laborsoftwarearchitektur",
      utterances: [
        "Wo findet das Modul Labor Softwarearchitektur statt",
        "Wo finde ich den Raum für Labor Softwarearchitektur",
        "Wann findet die Vorlesung Labor Softwarearchitektur statt",
        "Wer unterrichtet den Kurs Labor Softwarearchitektur",
        "Welcher Professor unterrichtet den Kurs Labor Softwarearchitektur",
      ],
      answers: [
        "Das Modul Labor Softwarearchitektur findet im Gebäude 01 - in der Flandernstraße 01.201 statt",
        "Das Modul Labor Softwarearchitektur findet im Raum F01.201 statt",
        "Am Mittwoch von 9:30-12:45(wöchentlich) findet die Vorlesung Labor Softwarearchitektur statt",
        "Den Kurs Labor Softwarearchitektur unterrichtet der Herr Friedrich",
        "Der Dozent ist Herr Friedrich",
      ],
    },
    {
      intent: "swb4.softwarearchitektur",
      utterances: [
        "Wo findet das Modul Softwarearchitektur statt",
        "Wo finde ich den Raum für Softwarearchitektur",
        "Wann findet die Vorlesung Softwarearchitektur statt",
        "Wer unterrichtet den Kurs Softwarearchitektur",
        "Welcher Professor unterrichtet den Kurs Softwarearchitektur",
      ],
      answers: [
        "Das Modul Softwarearchitektur findet im Gebäude 01 - in der Flandernstraße 01.-110 statt",
        "Das Modul Softwarearchitektur findet im Raum F01.-110 statt",
        "Am Mittwoch von 9:30-12:45(wöchentlich) findet die Vorlesung Softwarearchitektur statt",
        "Den Kurs Softwarearchitektur unterrichtet der Herr Friedrich",
        "Der Dozent ist Herr Friedrich",
      ],
    },
    {
      intent: "swb4.mci2",
      utterances: [
        "Wo findet das Modul Mensch-Computer-Interaktion 2 statt",
        "Wo finde ich den Raum für Mensch-Computer-Interaktion 2",
        "Wann findet die Vorlesung Mensch-Computer-Interaktion 2 statt",
        "Wer unterrichtet den Kurs Mensch-Computer-Interaktion 2",
        "Welcher Professor unterrichtet den Kurs Mench-Computer-Interaktion 2",
      ],
      answers: [
        "Das Modul Mensch-Computer-Interaktion 2 findet im Gebäude 01 - in der Flandernstraße 01.213 statt",
        "Das Modul Mensch-Computer-Interaktion 2 findet im Raum F01.213 statt",
        "Am Donnerstag von 9:30-12:45(wöchentlich) findet die Vorlesung Mensch-Computer-Interaktion 2 statt",
        "Den Kurs Mensch-Computer-Interaktion 2 unterrichtet der Herr Rößler",
        "Der Dozent ist Herr Rößler",
      ],
    },
    {
      intent: "swb4.labormci2",
      utterances: [
        "Wo findet das Modul Labor Mensch-Computer-Interaktion 2 statt",
        "Wo finde ich den Raum für Labor Mensch-Computer-Interaktion 2",
        "Wann findet die Vorlesung Labor Mensch-Computer-Interaktion 2 statt",
        "Wer unterrichtet den Kurs Labor Mensch-Computer-Interaktion 2",
        "Welcher Professor unterrichtet den Kurs Labor Mench-Computer-Interaktion 2",
      ],
      answers: [
        "Das Modul Labor Mensch-Computer-Interaktion 2 findet im Gebäude 01 - in der Flandernstraße 01.303 statt",
        "Das Modul Labor Mensch-Computer-Interaktion 2 findet im Raum F01.303 statt",
        "Am Donnerstag von 9:30-12:45(wöchentlich) findet die Vorlesung Labor Mensch-Computer-Interaktion 2 statt",
        "Den Kurs Labor Mensch-Computer-Interaktion 2 unterrichtet der Herr Rößler",
        "Der Dozent ist Herr Rößler",
      ],
    },
    {
      intent: "swb4.datenbanken2",
      utterances: [
        "Wo findet das Modul Datenbanken 2 statt",
        "Wo finde ich den Raum für Datenbanken 2",
        "Wann findet die Vorlesung Datenbanken 2 statt",
        "Wer unterrichtet den Kurs Datenbanken 2",
        "Welcher Professor unterrichtet den Kurs Datenbanken 2",
      ],
      answers: [
        "Das Modul Datenbanken 2 findet im Gebäude 01 - in der Flandernstraße 01.410 statt",
        "Das Modul Datenbanken 2 findet im Raum F01.410 statt",
        "Am Donnerstag von 9:30-12:45(wöchentlich) findet die Vorlesung Datenbanken 2 statt",
        "Den Kurs Datenbanken 2 unterrichtet der Herr Hesse",
        "Der Dozent ist Herr Hesse",
      ],
    },
    {
      intent: "swb4.kfzsysteme",
      utterances: [
        "Wo findet das Modul Kfz-Systeme statt",
        "Wo finde ich den Raum für Kfz-Systeme",
        "Wann findet die Vorlesung Kfz-Systeme statt",
        "Wer unterrichtet den Kurs Kfz-Systeme",
        "Welcher Professor unterrichtet den Kurs Kfz-Systeme",
      ],
      answers: [
        "Das Modul Kfz-Systeme findet im Gebäude 01 - in der Flandernstraße 01.311 statt",
        "Das Modul Kfz-Systeme findet im Raum F01.311 statt",
        "Am Freitag von 7:35-11:00(wöchentlich) findet die Vorlesung Kfz-Systeme statt",
        "Den Kurs Kfz-Systeme unterrichtet der Herr Bürkle",
        "Der Dozent ist Herr Bürkle",
      ],
    },
    {
      intent: "swb4.cloudcomputing",
      utterances: [
        "Wo findet das Modul Cloud Computing statt",
        "Wo finde ich den Raum für Cloud Computinge",
        "Wann findet die Vorlesung Cloud Computing statt",
        "Wer unterrichtet den Kurs Cloud Computing",
        "Welcher Professor unterrichtet den Kurs Cloud Computing",
      ],
      answers: [
        "Das Modul Cloud Computing findet im Gebäude 01 - in der Flandernstraße 01.214 statt",
        "Das Modul Cloud Computing findet im Raum F01.214 statt",
        "Am Freitag von 7:30-11:00(wöchentlich) findet die Vorlesung Cloud Computing statt",
        "Den Kurs Cloud Computing unterrichtet der Herr Hartmann",
        "Der Dozent ist Herr Hartmann",
      ],
    },
    {
      intent: "swb4.laborcomputerarchitektur",
      utterances: [
        "Wo findet das Modul Labor Computerarchitektur statt",
        "Wo finde ich den Raum für Labor Computerarchitektur",
        "Wann findet die Vorlesung Labor Computerarchitektur statt",
        "Wer unterrichtet den Kurs Labor Computerarchitektur",
        "Welcher Professor unterrichtet den Kurs Labor Computerarchitektur",
      ],
      answers: [
        "Das Modul Labor Computerarchitektur findet im Gebäude 01 - in der Flandernstraße 01.307 statt",
        "Das Modul Labor Computerarchitektur findet im Raum F01.307 statt",
        "Am Montag von 14:00-17:15(wöchentlich) findet die Vorlesung Labor Computerarchitektur statt",
        "Den Kurs Labor Computerarchitektur unterrichtet der Herr Redmers",
        "Der Dozent ist Herr Redmers",
      ],
    },
    {
      intent: "swb4.algorithmenunddatenstruktur",
      utterances: [
        "Wo findet das Modul Algorithmen und Datenstruktur statt",
        "Wo finde ich den Raum für Algorithmen und Datenstruktur",
        "Wann findet die Vorlesung Algorithmen und Datenstruktur statt",
        "Wer unterrichtet den Kurs Algorithmen und Datenstruktur",
        "Welcher Professor unterrichtet den Kurs Algorithmen und Datenstruktur",
      ],
      answers: [
        "Das Modul Algorithmen und Datenstruktur findet im Gebäude 01 - in der Flandernstraße 01.311 statt",
        "Das Modul Algorithmen und Datenstruktur findet im Raum F01.311 statt",
        "Am Dienstag von 14:00-17:15(wöchentlich) findet die Vorlesung Algorithmen und Datenstruktur statt",
        "Den Kurs Algorithmen und Datenstruktur unterrichtet der Herr Schober",
        "Der Dozent ist Herr Schober",
      ],
    },
    {
      intent: "swb4.computergrafik",
      utterances: [
        "Wo findet das Modul Computergrafik statt",
        "Wo finde ich den Raum für Computergrafik",
        "Wann findet die Vorlesung Computergrafik statt",
        "Wer unterrichtet den Kurs Computergrafik",
        "Welcher Professor unterrichtet den Kurs Computergrafik",
      ],
      answers: [
        "Das Modul Computergrafik findet im Gebäude 01 - in der Flandernstraße 01.311 statt",
        "Das Modul Computergrafik findet im Raum F01.311 statt",
        "Am Mittwoch von 14:00-17:15(wöchentlich) findet die Vorlesung Computergrafik statt",
        "Den Kurs Computergrafik unterrichtet der Herr Schmidt",
        "Der Dozent ist Herr Schmidt",
      ],
    },
    {
      intent: "swb4.computerarchitektur",
      utterances: [
        "Wo findet das Modul Computerarchitektur statt",
        "Wo finde ich den Raum für Computerarchitektur",
        "Wann findet die Vorlesung Computerarchitektur statt",
        "Wer unterrichtet den Kurs Computerarchitektur",
        "Welcher Professor unterrichtet den Kurs Computerarchitektur",
      ],
      answers: [
        "Das Modul Computerarchitektur findet im Gebäude 01 - in der Flandernstraße 01.-102 statt",
        "Das Modul Computerarchitektur findet im Raum F01.-102 statt",
        "Am Mittwoch von 14:00-17:15(wöchentlich) findet die Vorlesung Computerarchitektur statt",
        "Den Kurs Computerarchitektur unterrichtet der Herr Keller",
        "Der Dozent ist Herr Keller",
      ],
    },
    {
      intent: "swb4.introductiontorealtimekernels",
      utterances: [
        "Wo findet das Modul Introduction to Real Time Kernels statt",
        "Wo finde ich den Raum für Introduction to Real Time Kernels",
        "Wann findet die Vorlesung Introduction to Real Time Kernels statt",
        "Wer unterrichtet den Kurs Introduction to Real Time Kernels",
        "Welcher Professor unterrichtet den Kurs Introduction to Real Time Kernels",
      ],
      answers: [
        "Das Modul Introduction to Real Time Kernels findet per Webex also online statt",
        "Das Modul Introduction to Real Time Kernels findet in einem Webex Raum statt",
        "Am Mittwoch von 17:30-19:00(wöchentlich) findet die Vorlesung Introduction to Real Time Kernels statt",
        "Den Kurs Introduction to Real Time Kernels unterrichtet der Herr Mackellar.",
        "Der Dozent ist Herr Mackellar.",
      ],
    },
    {
      intent: "swb4.angewandtekryptografie",
      utterances: [
        "Wo findet das Modul Angewandte Kryptografie statt",
        "Wo finde ich den Raum für Angewandte Kryptografie",
        "Wann findet die Vorlesung Angewandte Kryptografie statt",
        "Wer unterrichtet den Kurs Angewandte Kryptografie",
        "Welcher Professor unterrichtet den Kurs Angewandte Kryptografie",
      ],
      answers: [
        "Das Modul Angewandte Kryptografie findet im Gebäude 01 - in der Flandernstraße 01.309 statt",
        "Das Modul Angewandte Kryptografie findet im Raum F01.309 statt",
        "Am Donnerstag von 14:00-15:30(wöchentlich) findet die Vorlesung Angewandte Kryptografie statt",
        "Den Kurs Angewandte Kryptografie unterrichtet der Herr Heer",
        "Der Dozent ist Herr Heer",
      ],
    },
    {
      intent: "swb4.automotivesecurity",
      utterances: [
        "Wo findet das Modul Automotive Security statt",
        "Wo finde ich den Raum für Automotive Security",
        "Wann findet die Vorlesung Automotive Security statt",
        "Wer unterrichtet den Kurs Automotive Security",
        "Welcher Professor unterrichtet den Kurs Automotive Security",
      ],
      answers: [
        "Das Modul Automotive Security findet im Gebäude 01 - in der Flandernstraße 01.309 statt",
        "Das Modul Automotive Security findet im Raum F01.309 statt",
        "Am Donnerstag von 15:45-19:00(wöchentlich) findet die Vorlesung Automotive Security statt",
        "Den Kurs Automotive Security unterrichtet der Herr Massierer",
        "Der Dozent ist Herr Massierer",
      ],
    },
    {
      intent: "swb4.projektarbeit",
      utterances: [
        "Wo findet das Modul Projektarbeit statt",
        "Wo finde ich den Raum für Projektarbeit",
        "Wann findet die Vorlesung Projektarbeit statt",
        "Wer unterrichtet den Kurs Projektarbeit",
        "Welcher Professor unterrichtet den Kurs Projektarbeit",
      ],
      answers: [
        "Das Modul Projektarbeit findet im Gebäude 01 - in der Flandernstraße 01.FV1 statt",
        "Das Modul Projektarbeit findet im Raum F01.FV1 statt",
        "Am Freitag von 14:00-17:15(wöchentlich) findet die Vorlesung Projektarbeit statt",
        "Den Kurs Projektarbeit unterrichtet der Herr Rößler",
        "Der Dozent ist Herr Rößler",
      ],
    },
    {
      intent: "swb4.mensa",
      utterances: [
        "Wo finde ich die Mensa",
        "Ich habe hunger",
        "Wo kann ich was zu Essen holen",
        "Ich brauche was zu essen",
      ],
      answers: [
        "Aktuell kannst du, wegen Corona, nur in dem Standort Esslingen Stadtmitte in die Mensa",
        "Die Mensa ist leider wegen Corona geschlossen",
        "Gehe zum Supermarkt Nahkauf",
        "In der Nähe gibt es einen Dönerladen",
      ],
    },
  ],
});

// Create the collection
db.createCollection("allgemein", { capped: false });
// Create Allgemein
db.allgemein.insertOne({
  botName: "questMe",
  selectedIcon: {
    name: "Bot picture 01",
    condition: true,
    src: "assets/images/Bot Picture.png",
  },
});
