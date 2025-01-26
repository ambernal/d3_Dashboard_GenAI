const voicing7b = [
    {
        groupName: "Voicing de Séptima Cuerdas 1, 2, 3, 4",
        color: '#FF6B6B',
        formations: [
            {
                mapping: [
                    {string: 1, interval: '3'},
                    {string: 2, interval: '7m'},
                    {string: 3, interval: '5J'},
                    {string: 4, interval: 'T'}
                ]
            },
            {
                mapping: [
                    {string: 1, interval: 'T'},
                    {string: 2, interval: '5J'},
                    {string: 3, interval: '3'},
                    {string: 4, interval: '7m'}
                ]
            },
            {
                mapping: [
                    {string: 1, interval: '5J'},
                    {string: 2, interval: 'T'},
                    {string: 3, interval: '7m'},
                    {string: 4, interval: '3'}
                ]
            },
            {
                mapping: [
                    {string: 1, interval: '7m'},
                    {string: 2, interval: '3'},
                    {string: 3, interval: 'T'},
                    {string: 4, interval: '5J'}
                ]
            }
        ]
    },
    {
        groupName: "Voicing de Séptima Cuerdas 2, 3, 4, 5",
        color: '#4ECDC4',
        formations: [
            {
                mapping: [
                    {string: 2, interval: '3'},
                    {string: 3, interval: '7m'},
                    {string: 4, interval: '5J'},
                    {string: 5, interval: 'T'}
                ]
            },
            {
                mapping: [
                    {string: 2, interval: 'T'},
                    {string: 3, interval: '5J'},
                    {string: 4, interval: '3'},
                    {string: 5, interval: '7m'}
                ]
            },
            {
                mapping: [
                    {string: 2, interval: '5J'},
                    {string: 3, interval: 'T'},
                    {string: 4, interval: '7m'},
                    {string: 5, interval: '3'}
                ]
            },
            {
                mapping: [
                    {string: 2, interval: '7m'},
                    {string: 3, interval: '3'},
                    {string: 4, interval: 'T'},
                    {string: 5, interval: '5J'}
                ]
            }
        ]
    },
    {
        groupName: "Voicing de Séptima Cuerdas 3, 4, 5, 6",
        color: '#FDCB6E',
        formations: [
            {
                mapping: [
                    {string: 3, interval: '3'},
                    {string: 4, interval: '7m'},
                    {string: 5, interval: '5J'},
                    {string: 6, interval: 'T'}
                ]
            },
            {
                mapping: [
                    {string: 3, interval: 'T'},
                    {string: 4, interval: '5J'},
                    {string: 5, interval: '3'},
                    {string: 6, interval: '7m'}
                ]
            },
            {
                mapping: [
                    {string: 3, interval: '5J'},
                    {string: 4, interval: 'T'},
                    {string: 5, interval: '7m'},
                    {string: 6, interval: '3'}
                ]
            },
            {
                mapping: [
                    {string: 3, interval: '7m'},
                    {string: 4, interval: '3'},
                    {string: 5, interval: 'T'},
                    {string: 6, interval: '5J'}
                ]
            }
        ]
    }
];

const voicing7c = 'fdfd';

// Exportación predeterminada
export default { voicing7b, voicing7c };

