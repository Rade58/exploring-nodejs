function *hello() {
  yield 2;

  yield 4;

  yield {hello: 10}


}

console.log(hello())

/* for(let item of hello()){
  console.log(item)
}
 */