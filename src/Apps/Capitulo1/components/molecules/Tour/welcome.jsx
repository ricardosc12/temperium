export function tourWelcome(){
    introJs().setOptions({
        nextLabel: "Avançar",
        prevLabel: "Anterior",
        steps: [
        {
            title: 'Primeiros passos',
            intro: 'Este é o Temperium'
        }
    ]
      }).start();
}