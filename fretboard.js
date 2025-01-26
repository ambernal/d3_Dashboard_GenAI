import { 
    strings, 
    chromaticNotes, 
    intervals, 
    scales, 
    triadColors,
    getIntervalName,
    getNoteAtPosition,
    doesLineExist,
    replace3Interval
} from './utils.js';

import dataVoicing7 from './dataVoicing7.js';
import triadsData from './dataTriads.js';
const { voicing7b, voicing7c } = dataVoicing7;

const svg = d3.select("#fretboard");
const keySelect = d3.select("#key-select");
const scaleSelect = d3.select("#scale-select");
const width = 850, height = 300, numFrets = 14, numStrings = 6;
const svgMargin = 40; // Margen izquierdo
const effectiveWidth = width - (svgMargin * 2); // Margen en ambos lados; // Ancho efectivo para el dibujo
const fretWidth = effectiveWidth / (numFrets + 1);
const stringSpacing = height / (numStrings + 1);


function drawFretboard() {
    svg.selectAll("*").remove();

    // Draw frets
    for (let i = 0; i <= numFrets; i++) {
        svg.append('line')
            .attr('x1', svgMargin + i * fretWidth)
            .attr('y1', stringSpacing)
            .attr('x2', svgMargin + i * fretWidth)
            .attr('y2', height - stringSpacing)
            .attr('class', 'fret')
            .attr('stroke', '#333')
            .attr('stroke-width', i === 0 ? 5 : 2);
    }

    // Draw 6 strings
    for (let j = 0; j < numStrings; j++) {
        const stringY = (j + 1) * stringSpacing;
        svg.append('line')
            .attr('x1', svgMargin)
            .attr('y1', stringY)
            .attr('x2', width - svgMargin)
            .attr('y2', stringY)
            .attr('stroke', '#888')
            .attr('stroke-width', '1.8');
    }

    // Draw fret markers circles
    const fretMarkers = [3, 5, 7, 9, 12];
    fretMarkers.forEach(fret => {
        svg.append('circle')
            .attr('cx', svgMargin + fret * fretWidth - fretWidth/2)
            .attr('cy', height/2)
            .attr('r', 8)
            .attr('fill', '#ddd');
    });

    const selectedKey = keySelect.property('value');
    const selectedTriad = d3.select("#triad-select").property('value');
    const selectedChord7 = d3.select("#chord7-type").property('value');
    const selectedScale = document.getElementById('scale-select').value;
    const selectedGradeType = d3.select("#grade-type").property('value');
    const selectedDisplayType = d3.select("#display-type").property('value');
    const keyIndex = chromaticNotes.indexOf(selectedKey);

    const triadIntervals = {
        'Mayor': ['3M', '5J'],
        'Menor': ['3m', '5J']
    }[selectedTriad];
    const gradeType = selectedGradeType === 'Mayor' ? '3M' : '3m';

    let formation_groups = [];
    if (selectedChord7 !== '') {
        const allChords7 = replace3Interval(voicing7b, gradeType);
        
        // Buscar el grupo que coincida con el nombre seleccionado
        const selectedGroup = allChords7.find(group => group.groupName === selectedChord7);
        formation_groups = selectedGroup ? [selectedGroup] : allChords7;
    } else if (selectedTriad !== '') {
        const allTriads = replace3Interval(triadsData.formations, gradeType);
        
        // Si es "Todas las triadas" mostrar todos los grupos
        if (selectedTriad === 'Todas las triadas') {
            formation_groups = allTriads;
        } else {
            // Buscar el grupo que coincida con el nombre seleccionado
            const selectedGroup = allTriads.find(group => group.groupName === selectedTriad);
            formation_groups = selectedGroup ? [selectedGroup] : [];
        }
    }

    // Clear legend
    const legendContainer = document.querySelector('#legend > div > div');
    legendContainer.innerHTML = '';

    // Draw formations
    formation_groups.forEach((group, groupIndex) => {
        // Add to legend
        const legendItem = document.createElement('div');
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        legendItem.style.gap = '5px';
        
        const colorBox = document.createElement('div');
        colorBox.style.width = '20px';
        colorBox.style.height = '20px';
        colorBox.style.backgroundColor = group.color;
        colorBox.style.borderRadius = '4px';
        
        const text = document.createElement('span');
        text.textContent = group.groupName;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        legendContainer.appendChild(legendItem);

        //Draw formations
        group.formations.forEach(formation => {
            const formationPositions = [];
            
            formation.mapping.forEach((map, index) => {
                let found = false;
                let bestFret = 0;
                let minDistance = Infinity;

                //si es la primera nota, buscar todas las posiciones posibles para la primera nota
                if (index === 0) {
                    let possiblePositions = [];
                    // Buscar todas las posiciones posibles para la primera nota
                    for (let fret = 0; fret <= numFrets; fret++) {
                        const note = getNoteAtPosition(strings[map.string - 1], fret);
                        const intervalValue = intervals[map.interval];
                        const expectedNote = chromaticNotes[(keyIndex + intervalValue) % 12];

                        if (note === expectedNote) {
                            possiblePositions.push(fret);
                        }
                    }

                    // Para cada posición posible, calcular la distancia total con las notas siguientes
                    let bestPosition = 0;
                    let minTotalDistance = Infinity;

                    possiblePositions.forEach(pos => {
                        let totalDistance = 0;
                        
                        // Comprobar distancia con las notas siguientes
                        formation.mapping.slice(1).forEach(nextMap => {
                            let minDistForThisNote = Infinity;
                            
                            // Buscar la posición más cercana para la siguiente nota
                            for (let nextFret = 0; nextFret <= numFrets; nextFret++) {
                                const nextNote = getNoteAtPosition(strings[nextMap.string - 1], nextFret);
                                const nextIntervalValue = intervals[nextMap.interval];
                                const nextExpectedNote = chromaticNotes[(keyIndex + nextIntervalValue) % 12];

                                if (nextNote === nextExpectedNote) {
                                    const distance = Math.abs(nextFret - pos);
                                    minDistForThisNote = Math.min(minDistForThisNote, distance);
                                }
                            }
                            totalDistance += minDistForThisNote;
                        });

                        if (totalDistance < minTotalDistance) {
                            minTotalDistance = totalDistance;
                            bestPosition = pos;
                        }
                    });

                    formationPositions.push({
                        string: map.string,
                        fret: bestPosition,
                        interval: map.interval,
                        note: getNoteAtPosition(strings[map.string - 1], bestPosition)
                    });
                    found = true;
                } else {
                    for (let fret = 0; fret <= numFrets; fret++) {
                        const note = getNoteAtPosition(strings[map.string - 1], fret);
                        const intervalValue = intervals[map.interval];
                        const expectedNote = chromaticNotes[(keyIndex + intervalValue) % 12];

                        if (note === expectedNote) {
                            const distance = Math.abs(fret - formationPositions[index-1].fret);
                            if (distance < minDistance) {
                                minDistance = distance;
                                bestFret = fret;
                                found = true;
                            }
                        }
                    }

                    if (found) {
                        formationPositions.push({
                            string: map.string,
                            fret: bestFret,
                            interval: map.interval,
                            note: getNoteAtPosition(strings[map.string - 1], bestFret)
                        });
                    }
                }
            });

            // Draw lines between positions
            if (formationPositions && formationPositions.length > 1) {
                for (let i = 0; i < formationPositions.length - 1; i++) {
                    if (formationPositions[i] && formationPositions[i + 1]) {
                        const fretCenter = fretWidth / 2;
                        let padding = 0;    
                        const x1 = svgMargin + formationPositions[i].fret * fretWidth + fretCenter;
                        const y1 = formationPositions[i].string * stringSpacing;
                        const x2 = svgMargin + formationPositions[i+1].fret * fretWidth + fretCenter;
                        const y2 = formationPositions[i+1].string * stringSpacing;   
                        
                        // Verificar si ya existe una línea similar
                        if (doesLineExist(svg, x1, y1, x2, y2)) {
                            padding = 5; // Desplazar la línea si ya existe una similar
                        }
                        
                        // Calcular el ángulo de la línea para aplicar el padding perpendicular
                        const angle = Math.atan2(y2 - y1, x2 - x1);
                        const perpendicular = angle + Math.PI/2;
                        
                        // Aplicar el padding perpendicular a la dirección de la línea
                        const offsetX = padding * Math.cos(perpendicular);
                        const offsetY = padding * Math.sin(perpendicular);
                        
                        svg.append('line')
                            .attr('x1', x1 + offsetX)
                            .attr('y1', y1 + offsetY)
                            .attr('x2', x2 + offsetX)
                            .attr('y2', y2 + offsetY)
                            .attr('stroke', group.color)
                            .attr('stroke-width', 5)
                            .attr('fill', 'none')
                            .attr('opacity', 0.9)
                            .attr('data-group', group.groupName);
                    }
                }
            }

            // Draw circles and labels for each position
            formationPositions.forEach((pos, index) => {
                const fretCenter = fretWidth / 2;
                const groupsInfo = formation_groups.map(g => ({
                    group: g,
                    positions: g.formations.flatMap(f => f.mapping)
                }));

                // Dibujar círculos concéntricos
                groupsInfo.forEach((info, index) => {
                    svg.append('circle')
                        .attr('cx', svgMargin + pos.fret * fretWidth + fretCenter)
                        .attr('cy', pos.string * stringSpacing)
                        .attr('r', 15 - (index * 5))
                        .attr('fill', info.group.color);
                });

                // Texto de la nota
                svg.append('text')
                    .attr('x', svgMargin + pos.fret * fretWidth + fretCenter)
                    .attr('y', pos.string * stringSpacing)
                    .attr('text-anchor', 'middle')
                    .attr('dy', 5)
                    .attr('class', 'note-label')
                    .attr('fill', pos.interval === 'T' ? 'black' : 'white')
                    .attr('font-weight', pos.interval === 'T' ? 'bold' : 'normal')
                    .attr('font-size', pos.interval === 'T' ? '20px' : '12px')
                    .text(selectedDisplayType === 'name' ? pos.note : pos.interval);
            });
        });
    });

    // Draw scale if selected
    if (selectedScale) {
        const scaleIntervals = scales[selectedScale];
        
        // For each string
        strings.forEach((openNote, stringIndex) => {
            // For each fret
            for (let fret = 0; fret <= numFrets; fret++) {
                const note = getNoteAtPosition(openNote, fret);
                const noteIndex = chromaticNotes.indexOf(note);
                const intervalValue = (noteIndex - keyIndex + 12) % 12;
                
                const isScaleNote = scaleIntervals.includes(intervalValue);
                
                if (isScaleNote) {
                    const fretCenter = fretWidth / 2;
                    svg.append('circle')
                        .attr('cx', svgMargin + fret * fretWidth + fretCenter)
                        .attr('cy', (stringIndex + 1) * stringSpacing)
                        .attr('r', intervalValue === 0 ? 18 : 15)
                        .attr('fill', '#4ECDC4');

                    const displayText = selectedDisplayType === 'name' ? note : getIntervalName(intervalValue);
                    
                    svg.append('text')
                        .attr('x', svgMargin + fret * fretWidth + fretCenter)
                        .attr('y', (stringIndex + 1) * stringSpacing)
                        .attr('text-anchor', 'middle')
                        .attr('dy', 5)
                        .attr('class', 'note-label')
                        .attr('fill', intervalValue === 0 ? 'black' : 'white')
                        .attr('font-weight', intervalValue === 0 ? 'bold' : 'normal')
                        .attr('font-size', intervalValue === 0 ? '20px' : '12px')
                        .text(displayText);
                }
            }
        });
    }
}

// Event listeners
drawFretboard();
keySelect.on('change', drawFretboard);
d3.select("#triad-select").on('change', drawFretboard);
d3.select("#chord7-type").on('change', drawFretboard);
d3.select("#display-type").on('change', drawFretboard);
d3.select("#grade-type").on('change', drawFretboard);
scaleSelect.on('change', drawFretboard); 