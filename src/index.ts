// boolean型
let isLogin: boolean = true; // boolean型の変数isLoginを宣言し、trueを格納
// isLoginにboolean型以外をの値を格納しようとするとエラーが表示される
// isLogin = 'string'; // 型'string'を型'boolean'に割り当てることはできません。 ts(322)

// booleanの1つの型を限定することも可能
// let isLogin: true = true;
// isLoginにtrue以外の値を格納しようとするとエラーが表示される
// isLogin = false; // 型'false'を型'true'に割り当てることはできません。 ts(2322)

// string型
let company: string = `株式会社〇〇`; // string型の変数companyを宣言し、株式会社〇〇という文字列を格納
// companyにstring型以外の値を格納しようとするとエラーが表示される
// company = 123456; // 型'number'を型'string'に割り当てることはできません。 ts(2322)

// number型
// number型の値はクォートで囲わない。囲うと文字列として扱われてしまう。
let number: number = 123456;

// object型
// object型はオブジェクトの形状を指定する
// TypeScriptは{}を使用して作成するようなシンプルなオブジェクトとnewを使って作成するような複雑なオブジェクトの違いを区別する事ができない。
// これは意図的に行われており、JavaScriptは通常構造的に型付けされるため、TypeScriptもそのようなスタイルを好む。
// これを 構造的部分型（structural subtyping） と言う。
let animal: object = {
  name: 'dog'
};

// console.log(animal.name); // プロパティ'name'は型'object'に存在しません。ts(2339)
// 上記はエラーになる
// object型を与えた変数は持っているプロパティ、メソッドに対してアクセスする事ができない。
// TypeScriptはオブジェクトリテラル記法でオブジェクトの形状を推論させることができる。
let animal2 = {
  name: 'dog'
}; // {name: string}

animal2.name; // {name: string}
// また、{}の中に明示的に指定することもできる
let animal3: {name: string} = {
  name: 'dog'
}; // {name: string}

animal3.name; // {name: string}

// オブジェクトリテラル表記は「ここに、このような形状を持つものがある」ことを表現している。
// そのものはオブジェクトリテラルかもしれませんし、クラスかもしれない。
let myPet: {
  name: string
  size: number
} = {
  name: 'トイプードル',
  size: 28
};

class Animal {
  constructor(
    public name: string, //publicは「this.name = name」の省略記法。
    public size: number
  ) {}
}
myPet = new Animal('チワワ', 20);
// {name: string; size: number}はオブジェクトの形状（shape）を表現しており、
// オブジェクトリテラルとクラスインスタンスの両方がその形状に合致すため、
// TypeScriptはAnimalのインスタンスをmyPetに割り当てることを許可する。

// デフォルトでは、TypeScriptはオブジェクトのプロパティに対して非常に厳格である。
// number型のsizeというプロパティだけを持つと記述した場合、sizeだけを期待する。
// プロパティに過不足があるとTypeScriptはエラーを出す。
// 値が省略可能な場合や予定よりも多くのプロパティが存在する可能性がある場合、以下のように記述する。
let riservationTicket: {
  type: string
  phoneNumber?: number  // booleanであるphoneNumberを持つ場合がある。phoneNumberを設定する場合undefinedでも構わない。
  [ticketNumber: number]: string // riservationTicketはstringである文字プロパティをticketNumberをkeyにして任意の数だけ持つことができる
}
riservationTicket = {type: "special", phoneNumber: 08012345678, 1: "A1"}
riservationTicket = {type: "member", phoneNumber: 09012345678, 1: "A2", 2: "A3"}
riservationTicket = {type: "normal", 1: "B1", 2: "B2"}
// オブジェクトリテラル表記は空のオブジェクト型を定義する事もできる{}
// nullとundefinedを除いてすべての型は空のオブジェクト型に割り当て可能だが
// この挙動は扱いづらいため、空のオブジェクト型はなるべく避けるようにする。

// array型
// 2つの表記方法がある。
let array1: string[] = [];
let array2: Array<Number> = [];
// 1番目の記法を単にarrayと呼び、2番目の記法をgenericと呼ぶ。
// 一般的に有名なのはarray型で次のように記述する。
let fluits : string[] = ['apple', 'orange', 'lemon'];

// tuple型
// タプルは配列のサブタイプ（派生型）で、固定長の配列を型付けするための特別な方法である。
// その配列の各インデックスでの値は特定の既知の型を持つ。
// JavaScriptのタプルと配列の構文は同じであり、TypeScriptには角括弧から配列の型を推論するためのルールが存在するため、
// 他の多くの型とは違い、タプルを宣言する場合は明示的に型付けする必要がある。
let dogs: [string, string, string] = ['チワワ', 'トイプードル', 'ダックスフンド'];
// また、タプルは可変長の要素もサポートしており、これを使用すると最小限の長さについて制約を持ったタプルを型付けできる。
let foodLists: [string, ...string[]] = ['寿司', '焼肉', 'ラーメン'];

// symbol型
// シンボルは比較的新しい言語機能であり、JavaScriptの最近の大きな改訂の1つ（ES2015）で導入されたもの。
// オブジェクトやマップにおいて文字列キーの代わりとして既知のキーが適切に使われていることを強く強調したいような場合に使用される。
// boolean, number, string型は同じリテラルであれば等値比較がtrueになるがsymbolは必ず同じものでない限りtrueにはならない。
const symbol1: symbol = Symbol('gizumo');
const symbol2: symbol = Symbol('gizumo');

console.log(symbol1 === symbol1); // -> true
console.log(symbol1 === symbol2); // -> false

// ユニオン型
// 複数の型を型アノテーションしたい時がある。
// string|numberのようにパイプを使用して複数の型を指定することができ、ユニオン型という。
interface IUser {
  id: number
  name: string
}

// function serializeUser(data: IUser[] | IUser): IUser[] | IUser {
//   return data;
// }
// dataに対して、配列のメソッドを使用したい場合は、下記のように配列かどうかチェックしないとコンパイルエラーが発生する。
function serializeUser(data: IUser[] | IUser): { users: IUser[] } | { user: IUser } {
  if(Array.isArray(data)) {
    const users = data.map(user => {
      return user;
    });
    return { users };
  }
  return {user: data};
}

// enum
// 列挙型とも呼ばれるenumは、値の集合を表現する際に使用する。
// ただ、仕様上安全ではないアクセスができてしまうため、使用しないことを推奨する。
enum Language {
  English,
  Spanish,
  Russian
}
console.log(Language.English); // 0
console.log(Language.Spanish); // 1
console.log(Language.Russian); // 2
// 数値または文字列を値として指定することができ、値はデフォルトでは0を基準に上からインクリメントされる。
// 値を数値として使用している場合は、値からアクセスできる。
console.log(Language[0]) // English
// ただ、上記のように数値が値の場合は存在しない値からアクセスしてもコンパイルエラーにならないという仕様があり、型安全ではない。
console.log(Language[3]) // undefined
// 値からのアクセスは、const enumと宣言することでコンパイルエラーとして検出できる。
const enum Language2 {
  English,
  Spanish,
  Russian
}
// console.log(Language2[0]) // Compile Error: A const enum member can only be accessed using a string literal.
// const enumとして宣言しても、関数の引数として数値を値として指定した場合は、コンパイルエラーが発生しない。
const enum Cities {
  Tokyo,
  Osaka,
  Nagoya
}

function getLatLng(cities: Cities) {
  switch(cities) {
    case Cities.Tokyo:
      return { lat: 35.4122, lng: 139.4130 };
    case Cities.Osaka:
      return { lat: 34.4111, lng: 135.3112 };
    case Cities.Nagoya:
      return { lat: 35.1855875, lng: 136.8990919 };
    default:
      return
  }
}
console.log(getLatLng(5)); // undefined

// any
// anyは特別な型で、型アノテーションされた値はどのような型の値が入ってきてもコンパイルエラーが発生しなくなる。
// 型チェックの恩恵を手放すことにもなるため、使用は避ける。
// tsconfig.jsonのnoImplicitAnyオプションをtrueにすることで、anyの型アノテーションをエラーとして検出できる。
let obj: any = { name: 'penguin' };
obj = 'Eagle';

// unknown
// unknownはany同様、どのような値でも代入可能。
let hoge: unknown = 'hoge';
hoge = 1;
hoge = [];

// anyの場合、存在しないプロパティにアクセスしてもコンパイルエラーにならない。
// 一方で、unknownを使用すると存在しないプロパティにアクセスするとコンパイルエラーが発生するようになる。
const jsonParser = (jsonString: string) => JSON.parse(jsonString);
const user = jsonParser('{ "name": "Bluse Banner" }');
console.log(user.name);
console.log(user.otherName);
// jsonPaserの返り値はanyのため、存在しないプロパティにアクセスしてもコンパイルエラーにならない。

// jsonParser右辺の無名関数の戻り値にunknownを型アノテーションすることで、コンパイルエラーが発生するようになる。
const jsonParser2 = (jsonString: string): unknown => JSON.parse(jsonString);
const user2 = jsonParser('{ "name": "jin" }');
console.log(user2.name);
// console.log(user2.otherName); // undefined

// 存在しているnameプロパティまでコンパイルエラーが発生してしているため、このままではコンパイルできない。
// TypeScriptコンパイラは型を判別できていない。
// unkonwn型アノテーションがされているオブジェクトのプロパティを参照、メソッドを実行するためにはTypeScriptコンパイラに対して教えてあげる必要がある。
// 型アサーションという機能を使用して、型を変換します。
type User = {
  name: string
}
const jsonParser3 = (jsonString: string): unknown => JSON.parse(jsonString);
const user3 = jsonParser3('{ "name": "hoge" }') as User;
// 上記はカタエイリアスを使用している
// `as User`が型アサーションという機能。
// jsonParser('{ "name": "hoge" }')式の戻り値であるanyをUserに変換している。
// これで、nameプロパティにアクセスしてもコンパイルエラーは発生しなくなった。

// null・undefined
// null、undefinedは他の型に代入可能です。
let num: number = 1;
num = null;
let str: string = undefined;

// trictNullChecksオプション
// tsconfig.jsonのstrictNullChecksをtrueにすることで、より安全なコードを書くことを強制できる。
const users = [
  {
    name: '太郎',
    age: 19
  },
  {
    name: '次郎',
    age: 16,
  },
];

const user = users.find(user => user.age >= 20);
console.log(user.name);
// strictNullChecksをfalseの場合、上記のコードはコンパイルされる。
// しかし、user変数の値はundefinedのため、ランタイムエラーが発生するコードになっている。
// Cannot read property 'name' of undefined
// find関数が次のような型アノテーションになっているため、undefinedが帰ってくる場合の実装をする必要があり。
// find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
const user4 = users.find(user => user.age >= 20);
if(user4) {
  console.log(user4.name);
} else {
  console.log(user4);
}
// ES2020で追加されるOptional Chaining演算子を使用すると、下記のように少ない記述にできる。
const user5 = users.find(user => user.age >= 20);
console.log(user5?.name);

// void
// 関数に戻り値がないことを型アノテーションする時には、voidを使用する。
function sayHello(): void {
  console.log('Hello TypeScript');
}

