import type {Database} from 'sqlite3'

const seed = async (client : {
  getAllRecords: () => Promise<unknown>;
  insertShiba: (info: string, bonkId: number) => Promise<unknown>;
  getShibaByBonkInfo: (bonkInfo: string) => Promise<unknown>;
  insertBonk: (info: string) => Promise<unknown>;
  getBonkByInfo: (info: string) => Promise<unknown>;
  run(sql: string): Promise<unknown>;
  get: (arg1: string) => Promise<unknown>;
  all: (arg1: string) => Promise<unknown>;
  exec: (arg1: string) => Promise<void>;
  myDB: Database;
}) => {


  await client.insertBonk("Shibetoshi Nakato one")
  await client.insertBonk("Shibetoshi Nakato two")
  await client.insertBonk("Shibetoshi Nakato three")
  await client.insertBonk("Shibetoshi Nakato four")
  await client.insertBonk("Shibetoshi Nakato five")
  await client.insertBonk("Shibetoshi Nakato six")
  await client.insertShiba("Hello World one", 1)
  await client.insertShiba("Hello World two", 2)
  await client.insertShiba("Hello World three", 3)
  await client.insertShiba("Hello World four", 4)
  await client.insertShiba("Hello World five", 5)
  await client.insertShiba("Hello World six", 6)


}


export default seed;