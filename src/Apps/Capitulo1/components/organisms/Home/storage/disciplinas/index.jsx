import create from 'solid-zustand'
import produce from 'immer'

export const useDisciplinas = create(set => ({
    dados: {
        disciplinas: [
            {
                id: "ccf441",
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
                        tags: ['ccf441', 'estudo', 'slide1'],
                        title: "Estudo",
                        description: "Estudos relacionas ao conteúdo abordado na primeira semana."
                    },
                    {
                        id:'com_sm1_t',
                        tags: ['ccf441', 'pesquisa', 'tp1'],
                        title: "Trabalho Prático",
                        description: "Leitura, pesquisas e atividades referentes a conclusão do trabalho prático."
                    },
                ]
            },
            {
                id: "ccf425",
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
                        tags: ['ccf425', 'estudo', 'aula1'],
                        title: "Estudo",
                        description: "Aula 1."
                    },
                    {
                        id:'2345',
                        tags: ['ccf425', 'pesquisa', 'tp1'],
                        title: "Atividade Prática",
                        description: "Conhecer o ambiente de desenvolvimento."
                    },
                ]
            }
        ]

    },
    change: {
        dispatch: {
            setDataAtividades: ({ }) => set(produce((state) => {
                state.dados = _;
            })),
        }
    }
}))
