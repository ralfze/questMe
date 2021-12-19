// Get 'corpus' db
db = new Mongo().getDB("corpus");

// Create the collection
db.createCollection("swb4", { capped: false });

// Insert db in Corpus
db.swb4.insertOne({
  name: "SWB4",
  locale: "de-DE",
  data: [
    {
      intent: "swb4.informationspsychologie.professor",
      utterances: [
        "Wer unterrichtet den Kurs Informationspsychologie",
        "Welcher Professor unterrichtet den Kurs Informationspsychologie",
      ],
      answers: [
        "Den Kurs Informationspsychologie unterrichtet der Herr Scholz",
        "Der Dozent ist Herr Scholz",
      ],
    },
    {
      intent: "swb4.informationspsychologie.room",
      utterances: [
        "Wo findet das Modul Informationspsychologie statt",
        "Wo finde ich den Raum für Informationspsychologie",
      ],
      answers: [
        "Das Modul Informationspsychologie findet im Gebäude 01 - in der Flandernstraße 01-303 statt",
        "Das Modul Informationspsychologie findet im Raum F01.303 statt",
      ],
    },
    {
      intent: "swb4.informationspsychologie.time",
      utterances: ["Wann findet die Vorlesung Informationspsychologie statt"],
      answers: [
        "Am Montag von 9:30-12:45(wöchentlich) findet die Vorlesung Informationspsychologie statt",
      ],
    },
    {
      intent: "swb4.datenschutz.professor",
      utterances: [
        "Wer unterrichtet den Kurs Datenschutz",
        "Welcher Professor unterrichtet den Kurs Datenschutz",
      ],
      answers: [
        "Den Kurs Datenschutz unterrichtet der Herr Schoop",
        "Der Dozent ist Herr Schoop",
      ],
    },
    {
      intent: "swb4.datenschutz.room",
      utterances: [
        "Wo findet das Modul Datenschutz statt",
        "Wo finde ich den Raum für Datenschutz",
      ],
      answers: [
        "Das Modul Datenschutz findet im Gebäude 01 - in der Flandernstraße 01-311 statt",
        "Das Modul Datenschutz findet im Raum F01.311 statt",
      ],
    },
    {
      intent: "swb4.datenschutz.time",
      utterances: ["Wann findet die Vorlesung Datenschutz statt"],
      answers: [
        "Am Montag von 9:30-12:45(wöchentlich) findet die Vorlesung Datenschutz statt",
      ],
    },
    {
      intent: "swb4.labordatenbanken2.professor",
      utterances: [
        "Wer unterrichtet den Kurs Labor Datenbanken 2",
        "Welcher Professor unterrichtet den Kurs Labor Datenbanken 2",
      ],
      answers: [
        "Den Kurs Labor Datenbanken 2 unterrichtet der Herr Hesse",
        "Der Dozent ist Herr Hesse",
      ],
    },
    {
      intent: "swb4.labordatenbanken2.room",
      utterances: [
        "Wo findet das Modul Labor Datenbanken 2 statt",
        "Wo finde ich den Raum für Labor Datenbanken 2",
      ],
      answers: [
        "Das Modul Labor Datenbanken 2 findet im Gebäude 01 - in der Flandernstraße 01-410 statt",
        "Das Modul Labor Datenbanken 2 findet im Raum F01.410 statt",
      ],
    },
    {
      intent: "swb4.labordatenbanken2.time",
      utterances: ["Wann findet die Vorlesung Labor Datenbanken 2 statt"],
      answers: [
        "Am Dienstag von 9:30-11:00(wöchentlich) findet die Vorlesung Labor Datenbanken 2 statt",
      ],
    },
    {
      intent: "swb4.laborsoftwarearchitektur.professor",
      utterances: [
        "Welcher Professor unterrichtet den Kurs Labor Softwarearchitektur",
      ],
      answers: [
        "Den Kurs Labor Softwarearchitektur unterrichtet der Herr Friedrich",
        "Der Dozent ist Herr Friedrich",
      ],
    },
    {
      intent: "swb4.laborsoftwarearchitektur.room",
      utterances: [
        "Wo findet das Modul Labor Softwarearchitektur statt",
        "Wo finde ich den Raum für Labor Softwarearchitektur",
      ],
      answers: [
        "Das Modul Labor Softwarearchitektur findet im Gebäude 01 - in der Flandernstraße 01.201 statt",
        "Das Modul Labor Softwarearchitektur findet im Raum F01.201 statt",
      ],
    },
    {
      intent: "swb4.laborsoftwarearchitektur.time",
      utterances: ["Wann findet die Vorlesung Labor Softwarearchitektur statt"],
      answers: [
        "Am Mittwoch von 9:30-12:45(wöchentlich) findet die Vorlesung Labor Softwarearchitektur statt",
      ],
    },
    {
      intent: "swb4.softwarearchitektur.professor",
      utterances: [
        "Wer unterrichtet den Kurs Softwarearchitektur",
        "Welcher Professor unterrichtet den Kurs Softwarearchitektur",
      ],
      answers: [
        "Den Kurs Softwarearchitektur unterrichtet der Herr Friedrich",
        "Der Dozent ist Herr Friedrich",
      ],
    },
    {
      intent: "swb4.softwarearchitektur.room",
      utterances: [
        "Wo findet das Modul Softwarearchitektur statt",
        "Wo finde ich den Raum für Softwarearchitektur",
      ],
      answers: [
        "Das Modul Softwarearchitektur findet im Gebäude 01 - in der Flandernstraße 01.-110 statt",
        "Das Modul Softwarearchitektur findet im Raum F01.-110 statt",
      ],
    },
    {
      intent: "swb4.softwarearchitektur.time",
      utterances: ["Wann findet die Vorlesung Softwarearchitektur statt"],
      answers: [
        "Am Mittwoch von 9:30-12:45(wöchentlich) findet die Vorlesung Softwarearchitektur statt",
      ],
    },
    {
      intent: "swb4.mci2.professor",
      utterances: [
        "Wer unterrichtet den Kurs Mensch-Computer-Interaktion 2",
        "Welcher Professor unterrichtet den Kurs Mench-Computer-Interaktion 2",
      ],
      answers: [
        "Den Kurs Mensch-Computer-Interaktion 2 unterrichtet der Herr Rößler",
        "Der Dozent ist Herr Rößler",
      ],
    },
    {
      intent: "swb4.mci2.room",
      utterances: [
        "Wo findet das Modul Mensch-Computer-Interaktion 2 statt",
        "Wo finde ich den Raum für Mensch-Computer-Interaktion 2",
      ],
      answers: [
        "Das Modul Mensch-Computer-Interaktion 2 findet im Gebäude 01 - in der Flandernstraße 01.213 statt",
        "Das Modul Mensch-Computer-Interaktion 2 findet im Raum F01.213 statt",
      ],
    },
    {
      intent: "swb4.mci2.time",
      utterances: [
        "Wann findet die Vorlesung Mensch-Computer-Interaktion 2 statt",
      ],
      answers: [
        "Am Donnerstag von 9:30-12:45(wöchentlich) findet die Vorlesung Mensch-Computer-Interaktion 2 statt",
      ],
    },
    {
      intent: "swb4.labormci2.professor",
      utterances: [
        "Wer unterrichtet den Kurs Labor Mensch-Computer-Interaktion 2",
        "Welcher Professor unterrichtet den Kurs Labor Mench-Computer-Interaktion 2",
      ],
      answers: [
        "Den Kurs Labor Mensch-Computer-Interaktion 2 unterrichtet der Herr Rößler",
        "Der Dozent ist Herr Rößler",
      ],
    },
    {
      intent: "swb4.labormci2.room",
      utterances: [
        "Wo findet das Modul Labor Mensch-Computer-Interaktion 2 statt",
        "Wo finde ich den Raum für Labor Mensch-Computer-Interaktion 2",
      ],
      answers: [
        "Das Modul Labor Mensch-Computer-Interaktion 2 findet im Gebäude 01 - in der Flandernstraße 01.303 statt",
        "Das Modul Labor Mensch-Computer-Interaktion 2 findet im Raum F01.303 statt",
      ],
    },
    {
      intent: "swb4.labormci2.time",
      utterances: [
        "Wann findet die Vorlesung Labor Mensch-Computer-Interaktion 2 statt",
      ],
      answers: [
        "Am Donnerstag von 9:30-12:45(wöchentlich) findet die Vorlesung Labor Mensch-Computer-Interaktion 2 statt",
      ],
    },
    {
      intent: "swb4.datenbanken2.professor",
      utterances: [
        "Wer unterrichtet den Kurs Datenbanken 2",
        "Welcher Professor unterrichtet den Kurs Datenbanken 2",
      ],
      answers: [
        "Den Kurs Datenbanken 2 unterrichtet der Herr Hesse",
        "Der Dozent ist Herr Hesse",
      ],
    },
    {
      intent: "swb4.datenbanken2.room",
      utterances: [
        "Wo findet das Modul Datenbanken 2 statt",
        "Wo finde ich den Raum für Datenbanken 2",
      ],
      answers: [
        "Das Modul Datenbanken 2 findet im Gebäude 01 - in der Flandernstraße 01.410 statt",
        "Das Modul Datenbanken 2 findet im Raum F01.410 statt",
      ],
    },
    {
      intent: "swb4.datenbanken2.time",
      utterances: ["Wann findet die Vorlesung Datenbanken 2 statt"],
      answers: [
        "Am Donnerstag von 9:30-12:45(wöchentlich) findet die Vorlesung Datenbanken 2 statt",
      ],
    },
    {
      intent: "swb4.kfzsysteme.professor",
      utterances: [
        "Wer unterrichtet den Kurs Kfz-Systeme",
        "Welcher Professor unterrichtet den Kurs Kfz-Systeme",
      ],
      answers: [
        "Den Kurs Kfz-Systeme unterrichtet der Herr Bürkle",
        "Der Dozent ist Herr Bürkle",
      ],
    },
    {
      intent: "swb4.kfzsysteme.room",
      utterances: [
        "Wo findet das Modul Kfz-Systeme statt",
        "Wo finde ich den Raum für Kfz-Systeme",
      ],
      answers: [
        "Das Modul Kfz-Systeme findet im Gebäude 01 - in der Flandernstraße 01.311 statt",
        "Das Modul Kfz-Systeme findet im Raum F01.311 statt",
      ],
    },
    {
      intent: "swb4.kfzsysteme.time",
      utterances: ["Wann findet die Vorlesung Kfz-Systeme statt"],
      answers: [
        "Am Freitag von 7:35-11:00(wöchentlich) findet die Vorlesung Kfz-Systeme statt",
      ],
    },
    {
      intent: "swb4.cloudcomputing.professor",
      utterances: [
        "Wer unterrichtet den Kurs Cloud Computing",
        "Welcher Professor unterrichtet den Kurs Cloud Computing",
      ],
      answers: [
        "Den Kurs Cloud Computing unterrichtet der Herr Hartmann",
        "Der Dozent ist Herr Hartmann",
      ],
    },
    {
      intent: "swb4.cloudcomputing.room",
      utterances: [
        "Wo findet das Modul Cloud Computing statt",
        "Wo finde ich den Raum für Cloud Computinge",
        "Wann findet die Vorlesung Cloud Computing statt",
      ],
      answers: [
        "Das Modul Cloud Computing findet im Gebäude 01 - in der Flandernstraße 01.214 statt",
        "Das Modul Cloud Computing findet im Raum F01.214 statt",
      ],
    },
    {
      intent: "swb4.cloudcomputing.time",
      utterances: ["Wann findet die Vorlesung Cloud Computing statt"],
      answers: [
        "Am Freitag von 7:30-11:00(wöchentlich) findet die Vorlesung Cloud Computing statt",
      ],
    },
    {
      intent: "swb4.laborcomputerarchitektur.professor",
      utterances: [
        "Wer unterrichtet den Kurs Labor Computerarchitektur",
        "Welcher Professor unterrichtet den Kurs Labor Computerarchitektur",
      ],
      answers: [
        "Den Kurs Labor Computerarchitektur unterrichtet der Herr Redmers",
        "Der Dozent ist Herr Redmers",
      ],
    },
    {
      intent: "swb4.laborcomputerarchitektur.room",
      utterances: [
        "Wo findet das Modul Labor Computerarchitektur statt",
        "Wo finde ich den Raum für Labor Computerarchitektur",
      ],
      answers: [
        "Das Modul Labor Computerarchitektur findet im Gebäude 01 - in der Flandernstraße 01.307 statt",
        "Das Modul Labor Computerarchitektur findet im Raum F01.307 statt",
      ],
    },
    {
      intent: "swb4.laborcomputerarchitektur.time",
      utterances: ["Wann findet die Vorlesung Labor Computerarchitektur statt"],
      answers: [
        "Am Montag von 14:00-17:15(wöchentlich) findet die Vorlesung Labor Computerarchitektur statt",
      ],
    },
    {
      intent: "swb4.algorithmenunddatenstruktur.professor",
      utterances: [
        "Wer unterrichtet den Kurs Algorithmen und Datenstruktur",
        "Welcher Professor unterrichtet den Kurs Algorithmen und Datenstruktur",
      ],
      answers: [
        "Den Kurs Algorithmen und Datenstruktur unterrichtet der Herr Schober",
        "Der Dozent ist Herr Schober",
      ],
    },
    {
      intent: "swb4.algorithmenunddatenstruktur.room",
      utterances: [
        "Wo findet das Modul Algorithmen und Datenstruktur statt",
        "Wo finde ich den Raum für Algorithmen und Datenstruktur",
      ],
      answers: [
        "Das Modul Algorithmen und Datenstruktur findet im Gebäude 01 - in der Flandernstraße 01.311 statt",
        "Das Modul Algorithmen und Datenstruktur findet im Raum F01.311 statt",
      ],
    },
    {
      intent: "swb4.algorithmenunddatenstruktur.time",
      utterances: [
        "Wann findet die Vorlesung Algorithmen und Datenstruktur statt",
      ],
      answers: [
        "Am Dienstag von 14:00-17:15(wöchentlich) findet die Vorlesung Algorithmen und Datenstruktur statt",
      ],
    },
    {
      intent: "swb4.computergrafik.professor",
      utterances: [
        "Wer unterrichtet den Kurs Computergrafik",
        "Welcher Professor unterrichtet den Kurs Computergrafik",
      ],
      answers: [
        "Den Kurs Computergrafik unterrichtet der Herr Schmidt",
        "Der Dozent ist Herr Schmidt",
      ],
    },
    {
      intent: "swb4.computergrafik.room",
      utterances: [
        "Wo findet das Modul Computergrafik statt",
        "Wo finde ich den Raum für Computergrafik",
      ],
      answers: [
        "Das Modul Computergrafik findet im Gebäude 01 - in der Flandernstraße 01.311 statt",
        "Das Modul Computergrafik findet im Raum F01.311 statt",
      ],
    },
    {
      intent: "swb4.computergrafik.time",
      utterances: ["Wann findet die Vorlesung Computergrafik statt"],
      answers: [
        "Am Mittwoch von 14:00-17:15(wöchentlich) findet die Vorlesung Computergrafik statt",
      ],
    },
    {
      intent: "swb4.computerarchitektur.professor",
      utterances: [
        "Wer unterrichtet den Kurs Computerarchitektur",
        "Welcher Professor unterrichtet den Kurs Computerarchitektur",
      ],
      answers: [
        "Den Kurs Computerarchitektur unterrichtet der Herr Keller",
        "Der Dozent ist Herr Keller",
      ],
    },
    {
      intent: "swb4.computerarchitektur.room",
      utterances: [
        "Wo findet das Modul Computerarchitektur statt",
        "Wo finde ich den Raum für Computerarchitektur",
      ],
      answers: [
        "Das Modul Computerarchitektur findet im Gebäude 01 - in der Flandernstraße 01.-102 statt",
        "Das Modul Computerarchitektur findet im Raum F01.-102 statt",
      ],
    },
    {
      intent: "swb4.computerarchitektur.time",
      utterances: ["Wann findet die Vorlesung Computerarchitektur statt"],
      answers: [
        "Am Mittwoch von 14:00-17:15(wöchentlich) findet die Vorlesung Computerarchitektur statt",
      ],
    },
    {
      intent: "swb4.introductiontorealtimekernels.professor",
      utterances: [
        "Wer unterrichtet den Kurs Introduction to Real Time Kernels",
        "Welcher Professor unterrichtet den Kurs Introduction to Real Time Kernels",
      ],
      answers: [
        "Den Kurs Introduction to Real Time Kernels unterrichtet der Herr Mackellar.",
        "Der Dozent ist Herr Mackellar.",
      ],
    },
    {
      intent: "swb4.introductiontorealtimekernels.room",
      utterances: [
        "Wo findet das Modul Introduction to Real Time Kernels statt",
        "Wo finde ich den Raum für Introduction to Real Time Kernels",
      ],
      answers: [
        "Das Modul Introduction to Real Time Kernels findet per Webex also online statt",
        "Das Modul Introduction to Real Time Kernels findet in einem Webex Raum statt",
      ],
    },
    {
      intent: "swb4.introductiontorealtimekernels.time",
      utterances: [
        "Wann findet die Vorlesung Introduction to Real Time Kernels statt",
      ],
      answers: [
        "Am Mittwoch von 17:30-19:00(wöchentlich) findet die Vorlesung Introduction to Real Time Kernels statt",
      ],
    },
    {
      intent: "swb4.angewandtekryptografie.professor",
      utterances: [
        "Wer unterrichtet den Kurs Angewandte Kryptografie",
        "Welcher Professor unterrichtet den Kurs Angewandte Kryptografie",
      ],
      answers: [
        "Den Kurs Angewandte Kryptografie unterrichtet der Herr Heer",
        "Der Dozent ist Herr Heer",
      ],
    },
    {
      intent: "swb4.angewandtekryptografie.room",
      utterances: [
        "Wo findet das Modul Angewandte Kryptografie statt",
        "Wo finde ich den Raum für Angewandte Kryptografie",
      ],
      answers: [
        "Das Modul Angewandte Kryptografie findet im Gebäude 01 - in der Flandernstraße 01.309 statt",
        "Das Modul Angewandte Kryptografie findet im Raum F01.309 statt",
      ],
    },
    {
      intent: "swb4.angewandtekryptografie.time",
      utterances: ["Wann findet die Vorlesung Angewandte Kryptografie statt"],
      answers: [
        "Am Donnerstag von 14:00-15:30(wöchentlich) findet die Vorlesung Angewandte Kryptografie statt",
      ],
    },
    {
      intent: "swb4.automotivesecurity.professor",
      utterances: [
        "Wer unterrichtet den Kurs Automotive Security",
        "Welcher Professor unterrichtet den Kurs Automotive Security",
      ],
      answers: [
        "Den Kurs Automotive Security unterrichtet der Herr Massierer",
        "Der Dozent ist Herr Massierer",
      ],
    },
    {
      intent: "swb4.automotivesecurity.room",
      utterances: [
        "Wo findet das Modul Automotive Security statt",
        "Wo finde ich den Raum für Automotive Security",
      ],
      answers: [
        "Das Modul Automotive Security findet im Gebäude 01 - in der Flandernstraße 01.309 statt",
        "Das Modul Automotive Security findet im Raum F01.309 statt",
      ],
    },
    {
      intent: "swb4.automotivesecurity.time",
      utterances: ["Wann findet die Vorlesung Automotive Security statt"],
      answers: [
        "Am Donnerstag von 15:45-19:00(wöchentlich) findet die Vorlesung Automotive Security statt",
      ],
    },
    {
      intent: "swb4.projektarbeit.professor",
      utterances: [
        "Wer unterrichtet den Kurs Projektarbeit",
        "Welcher Professor unterrichtet den Kurs Projektarbeit",
      ],
      answers: [
        "Den Kurs Projektarbeit unterrichtet der Herr Rößler",
        "Der Dozent ist Herr Rößler",
      ],
    },
    {
      intent: "swb4.projektarbeit.room",
      utterances: [
        "Wo findet das Modul Projektarbeit statt",
        "Wo finde ich den Raum für Projektarbeit",
      ],
      answers: [
        "Das Modul Projektarbeit findet im Gebäude 01 - in der Flandernstraße 01.FV1 statt",
        "Das Modul Projektarbeit findet im Raum F01.FV1 statt",
      ],
    },
    {
      intent: "swb4.projektarbeit.time",
      utterances: ["Wann findet die Vorlesung Projektarbeit statt"],
      answers: [
        "Am Freitag von 14:00-17:15(wöchentlich) findet die Vorlesung Projektarbeit statt",
      ],
    },
    {
      intent: "swb4.mensa.main",
      utterances: [
        "Wo finde ich die Mensa",
        "Ich habe hunger",
        "Wo kann ich was zu Essen holen",
        "Ich brauche was zu essen",
      ],
      answers: [
        "Aktuell kannst du, wegen Corona, nur in dem Standort Esslingen Stadtmitte in die Mensa",
        "Die Mensa ist leider wegen Corona geschlossen"
      ],
    },
    {
      intent: "swb4.mensa.alternative",
      utterances: [
        "Ich habe hunger und brauche etwas dringend",
        "Wo kann ich was zu Essen holen",
        "Ich brauche was zu essen",
      ],
      answers: [
        "Beim Supermarkt Nahkauf kannst du etwas zum Essen kaufen",
        "In der Nähe gibt es einen Dönerladen",
      ],
    },
  ],
});
