// Constantes
export const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // [1ª, 2ª, 3ª, 4ª, 5ª, 6ª]
export const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const intervals = {
    'T': 0,  // Tónica
    '2m': 1, // Segunda menor
    '2M': 2, // Segunda mayor
    '3m': 3, // Tercera menor
    '3M': 4, // Tercera mayor
    '4J': 5, // Cuarta justa
    '5J': 7, // Quinta justa
    '6m': 8, // Sexta menor
    '6M': 9, // Sexta mayor
    '7m': 10, // Séptima menor
    '7M': 11  // Séptima mayor
};

export const scales = {
    'Mayor': [0, 2, 4, 5, 7, 9, 11],
    'Menor Natural': [0, 2, 3, 5, 7, 8, 10],
    'Pentatónica Mayor': [0, 2, 4, 7, 9],
    'Pentatónica Menor': [0, 3, 5, 7, 10],
    'Blues': [0, 3, 5, 6, 7, 10]
};

export const triadColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7', '#A8E6CF',
    '#FF9F43', '#10AC84', '#5F27CD', '#FF6B81', '#1DD1A1', '#48DBFB',
    '#576574', '#341F97', '#8395A7', '#01A3A4'
];

// Funciones utilitarias
export function getIntervalName(value) {
    const intervalNames = {
        0: 'T', 2: '2M', 4: '3M', 5: '4J',
        7: '5J', 9: '6M', 11: '7M',
        1: '2m', 3: '3m', 6: '4A',
        8: '6m', 10: '7m'
    };
    return intervalNames[value];
}

export function getNoteAtPosition(openNote, fret) {
    const startIndex = chromaticNotes.indexOf(openNote);
    const noteIndex = (startIndex + fret) % 12;
    return chromaticNotes[noteIndex];
}

export function doesLineExist(svg, x1, y1, x2, y2) {
    // Busca entre todos los elementos <line> en el SVG
    const lineExists = svg.selectAll("line").nodes().some(line => {
        // Verifica si las coordenadas coinciden
        const lineX1 = +line.getAttribute("x1");
        const lineY1 = +line.getAttribute("y1");
        const lineX2 = +line.getAttribute("x2");
        const lineY2 = +line.getAttribute("y2");

        return (Math.abs(lineX1 - x1) < 1 && Math.abs(lineY1 - y1) < 1 && 
                Math.abs(lineX2 - x2) < 1 && Math.abs(lineY2 - y2) < 1) ||
               (Math.abs(lineX1 - x2) < 1 && Math.abs(lineY1 - y2) < 1 && 
                Math.abs(lineX2 - x1) < 1 && Math.abs(lineY2 - y1) < 1);
    });
    
    return lineExists;
}

export function replace3Interval(jsonChordsNotes, gradeType) {
    // Creamos una copia profunda del array para no modificar el original
    const modifiedChords = JSON.parse(JSON.stringify(jsonChordsNotes));
    
    modifiedChords.forEach(group => {
        group.formations.forEach(formation => {
            formation.mapping.forEach(mapping => {
                if (mapping.interval === '3') {
                    mapping.interval = gradeType;
                }
            });
        });
    });
    
    return modifiedChords;
} 