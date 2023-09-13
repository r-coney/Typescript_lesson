// ジェネリクス
//ジェネリクスとは、型引数を利用する。
//利用するまで方が決定しないクラスや関数、インターフェースを定義する際に使用する。
function findOne<T>(array: T[], f: (item: T) => boolean): T | undefined {
  for (let i = 0; i < array.length; i++) {
    if (f(array[i]) {
      return array[i]
    }
  }

  return;
}

