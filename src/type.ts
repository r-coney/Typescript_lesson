// 型エイリアス・交差型
// 型エイリアス
//型そのものを宣言する構文として型エイリアスがある。
//複数のコードに型アノテーションの共通化をする時に使用する
type Color = 'red' | 'blue' | 'green';
// 型エイリアスはブロックスコープを持つ。
const isDarkTheme = true

if (isDarkTheme) {
  type TextColor = 'white' | 'whitesmoke';
}

// const textColor: TextColor = 'white';
// TextColorのスコープ外でアノテーションしているため、エラーになる

// 交差型
// 交差型は、指定された2つ以上の形状を満たす新しい型を作成する
type Human = {
  name: string
}

type Hero = {
  heroName: string
  ability: string
}

const hulk: Human & Hero = {
  name: 'Bruce Banner',
  heroName: 'Hulk',
}
// 上記のhulk変数は、交差型で型アノテーションしたオブジェクトの型を満たしていないため、コンパイルエラーになる。
