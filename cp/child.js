const random = Math.round(Math.random()*100)

if(random > 26){
  process.exitCode = 0
}else{
  process.exitCode = 1
}