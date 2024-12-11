import { EventInterface } from '@splidejs/splide';

export function SmoothTransition(Splide, Components) {
  const { bind } = EventInterface(Splide);
  const { Move } = Components;
  const { list } = Components.Elements;
  let endCallback;

  function mount() {
    bind(list, 'transitionend', (e) => {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();  // Chama o callback 'done' quando a transição termina.
      }
    });
  }

  function start(index, done) {
    // Converte o índice para a posição
    const destination = Move.toPosition(index, true);

    // Aplica a transição CSS
    list.style.transition = 'transform 800ms cubic-bezier(.44,.65,.07,1.01)';

    // Move o carrossel para a posição desejada
    Move.translate(destination);

    // Mantém o callback para chamar após a transição
    endCallback = done;
  }

  function cancel() {
    // Remove a propriedade de transição quando a transição é interrompida
    list.style.transition = '';
  }

  return {
    mount,
    start,
    cancel,
  };
}
