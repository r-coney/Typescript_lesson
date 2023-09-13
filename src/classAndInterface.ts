// クラス
// プロパティの型アノテーション
class Calclater {
  _left: number;
  _right: number;
}

const calclater = new Calclater();
calclater._left = 5;
calclater._right = 3;

// プロパティおよびメソッドにはpublic、protected、private のようなアクセスアクセス修飾子を付与できる。
// 付与することでアクセスする範囲に制限をかけることができる。
// アクセス修飾子の宣言がない場合は、publicと同等になる。
// | アクセスする場所 |  public | protected | private | 
// | ---------------- | ------- | --------- | ------- | 
// | クラス内         | ◯       | ◯         | ◯       | 
// | サブクラス       | ◯       | ◯         |         | 
// | インスタンス     | ◯       |           |         | 
class Human2 {
  protected _name: string
  constructor(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  public move(distance: number) {
    return `${this._name} は ${distance} メートル移動した`;
  }
}

const taro = new Human2('太郎');
console.log(Human2._name); // Error Property '_name' is private and only accessible within class 'Human'.
console.log(Human2.name) // 太郎(アクセス修飾子がないのでpublic)
console.log(taro.move(10)); // 太郎 は 10 メートル移動した

class Hero2 extends Human2 {
  private _heroName: string
  private _ability: string
  constructor(name: string, heroName: string, ability: string) {
    super(name);
    this._heroName = heroName;
    this._ability = ability;
  }

  get heroName() {
    return this._heroName;
  }

  set heroName(heroName: string) {
    this._heroName = heroName;
  }

  get ability() {
    return this._ability;
  }

  set ability(ability: string) {
    this._ability = ability;
  }

  public transform() {
    return `${super._name} は ${this._heroName} に 変身した！`
  }
}

const hulk2 = new Hero2('Bruce Banner', 'Hulk', 'Transform');

// abstract修飾子
// abstract修飾子が指定されたクラスを抽象クラスと呼ぶ。
// 抽象クラスは直接インスタンス化することができない。
type Task = {
  id: number,
  title: string,
  description: string,
};

let tasks: Task[] = [
  {
    id: 1,
    title: '買い物',
    description: 'リンゴを買う'
  },
  {
    id: 2,
    title: '散歩',
    description: '犬の散歩をする'
  }
]

abstract class Controller<T> {
  abstract findAll(): Promise<Array<T>>
  abstract findOne(id: number): Promise<T | undefined>
  abstract update(target: T): Promise<T | undefined>
  abstract delete(id: number): Promise<void>
}
// 抽象クラス内でabstract修飾子が指定されているメソッドは、実装の詳細は書かない。
// 引数や戻り値を定義を型アノテーションし、実装はサブクラスの方で行う。
// 実装の詳細自体を書くことも可能。
class TaskController extends Controller<Task> {
  async findAll() {
    const res = [...tasks];
    return res;
  }

  async findOne(id: number) {
    const res = tasks.find((task) => task.id === id);
    return res;
  }

  async update(target: typeTask) {
    let res;
    tasks = tasks.map((task) => {
      if(task.id === target.id) {
        task = target
        res = task;
        return task;
      }
      return task;
    });
    return res;
  }
}
// 上記は抽象クラスControllerを継承したTaskController。
// Controllerクラスで定義したdeleteメソッドの実装がないため、コンパイルエラーになる。
// 抽象クラスを使用することで、可読性が高く変更に強いクラスを設計できる。

// インターフェース
// オブジェクトの構造を定義する方法の一つがインターフェース。
interface task {
  id: number;
  title: string;
  content: string;
}
// クラスはインターフェースを継承できる。
// インターフェースを継承する際は、extendsではなく、implementsを使用する。
class Task2 implements Task {
  id: number
  title: string
}
// インターフェースを継承したクラスは、継承元の形状を満たしている必要がある。
// 上記はdescriptionプロパティが存在しないため、コンパイルエラーがでる。
// オブジェクトの形状を表現できるTypeScriptの機能として、type aliasがある。
// インターフェースとの違いは、typeは右辺に型を直接指定できることです。
// インターフェースにはできない。
type Str = string;
// インターフェースは同じスコープ内に同名の型の宣言がある場合、形状がマージされる。
// 一方で、type aliasはコンパイルエラーがでる。
interface Foo {
  foo: string
}

interface Foo {
  hoge: string
}
// Fooを型アノテーションした場合、fooとhogeというstring型のプロパティを持っていなければいけない。
type Foo3 = {
  foo: string
}

type Foo3 = {
  hoge: string
}
// 同一スコープ内に同じ型名をtypeで宣言しているためコンパイルエラーが出る。
// 上記のような型のマージを型エイリアスでやるとするなら、交差型を使用して型の拡張ができる。
type Foo4 = {
  foo: string
}

type Hoge = {
  hoge: string
}

type FooHoge = Foo & Hoge

