export const disciplinasStorage = () => ({
    disciplinas: [
        {
            id: "CCF441",
            cor: "#abeecd",
            title: "Compiladores",
            description: "Disciplina ministrada pelo professor Daniel Mendes, ano de 2023/1",
            atividade_description: "Relembrandos conceitos - Sistemas Operacionais",
            aulas: [
                { dia: 'seg', horario: ['8:00', '9:00'], tipo:'aula', local: 'LEN007' },
                { dia: 'qua', horario: ['10:00', '11:00'], tipo:'aula', local: 'LEN007' },
            ],
            atividades: [
                {
                    id:'com_sm1_e',
                    tags: [
                        { title: 'CCF441', color: "#abeecd" },
                        { title: 'Estudo', color: "#abeeb0" },
                        { title: 'Aula 1', color: "#abeee6" }
                    ],
                    title: "Estudo",
                    description: "Estudos relacionas ao conteúdo abordado na primeira semana."
                },
                {
                    id:'com_sm1_t',
                    tags: [
                        { title: 'CCF441', color: "#abeecd" },
                        { title: 'Pesquisa', color: "#abeeb0" },
                        { title: 'TP1', color: "#abeee6" }
                    ],
                    title: "Trabalho Prático",
                    description: "Leitura, pesquisas e atividades referentes a conclusão do trabalho prático."
                },
            ]
        },
        {
            id: "CCF425",
            cor: "#e8bcf7",
            title: "Introdução à Ciência dos Dados",
            description: "Introdução à Ciência dos Dados",
            atividade_description: "Apresentar e discutir os principais tópicos relacionados à ciência dos dados",
            aulas: [
                { dia: 'seg', horario: ['13:00', '14:00'], tipo:'aula', local: 'LEN008' },
                { dia: 'qua', horario: ['15:00', '16:00'], tipo:'prática', local: 'PVBL02' },
            ],
            atividades: [
                {
                    id:'5435',
                    tags: [
                        { title: 'CCF425', color: "#e8bcf7" },
                        { title: 'Estudo', color: "#d5bcf7" },
                        { title: 'Aula 1', color: "#ffbce5" }
                    ],
                    title: "Estudo",
                    description: "Aula 1."
                },
                {
                    id:'2345',
                    tags: [
                        { title: 'CCF425', color: "#e8bcf7" },
                        { title: 'Pesquisa', color: "#d5bcf7" },
                        { title: 'TP1', color: "#ffbce5" }
                    ],
                    title: "Atividade Prática",
                    description: "Conhecer o ambiente de desenvolvimento."
                },
            ]
        }
    ],
})