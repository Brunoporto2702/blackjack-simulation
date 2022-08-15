export default class Card {
  figure: string;
  nipe: string;
  value: number;


  constructor(figure: string, nipe: string) {
    this.figure = figure;
    this.nipe = nipe;

    switch (this.figure) {
      case 'A':
        this.value = 11;
        break;
      case 'J':
        this.value = 10;
        break;
      case 'Q':
        this.value = 10;
        break;
      case 'K':
        this.value = 10;
        break;
      default:
        this.value = parseInt(this.figure);
    }
  }

}