import { CONSTANTS } from "../constants";
import initDB from "./indexedDB";

const userData = [
  { name: "John Doe", email: "john.doe@gmail.com", age: "25" },
  { name: "Jane Smith", email: "jane.smith@yahoo.com", age: "34" },
  { name: "Michael Johnson", email: "michael.johnson@hotmail.com", age: "29" },
  { name: "Emily Davis", email: "emily.davis@gmail.com", age: "42" },
  { name: "Chris Lee", email: "chris.lee@hotmail.com", age: "19" },
  { name: "Katie Brown", email: "katie.brown@yahoo.com", age: "33" },
  { name: "William Wilson", email: "william.wilson@outlook.com", age: "56" },
  { name: "Sophia White", email: "sophia.white@gmail.com", age: "27" },
  { name: "James Taylor", email: "james.taylor@yahoo.com", age: "39" },
  { name: "Olivia Anderson", email: "olivia.anderson@outlook.com", age: "41" },
  { name: "Liam Thomas", email: "liam.thomas@gmail.com", age: "22" },
  { name: "Ava Martinez", email: "ava.martinez@hotmail.com", age: "28" },
  { name: "Mason Garcia", email: "mason.garcia@outlook.com", age: "37" },
  { name: "Isabella Rodriguez", email: "isabella.rodriguez@gmail.com", age: "48"},
  { name: "Ethan Harris", email: "ethan.harris@yahoo.com", age: "25" },
  { name: "Charlotte Clark", email: "charlotte.clark@hotmail.com", age: "31" },
  { name: "Logan Lewis", email: "logan.lewis@outlook.com", age: "23" },
  { name: "Amelia Walker", email: "amelia.walker@gmail.com", age: "45" },
  { name: "Jacob Hall", email: "jacob.hall@yahoo.com", age: "27" },
  { name: "Ella Allen", email: "ella.allen@hotmail.com", age: "52" },
  { name: "Daniel Young", email: "daniel.young@outlook.com", age: "32" },
  { name: "Grace King", email: "grace.king@gmail.com", age: "36" },
  { name: "Matthew Scott", email: "matthew.scott@yahoo.com", age: "38" },
  { name: "Chloe Adams", email: "chloe.adams@gmail.com", age: "29" },
  { name: "Ryan Baker", email: "ryan.baker@hotmail.com", age: "44" },
  { name: "Lucas Nelson", email: "lucas.nelson@outlook.com", age: "31" },
  { name: "Zoe Carter", email: "zoe.carter@yahoo.com", age: "30" },
  { name: "Jackson Mitchell", email: "jackson.mitchell@gmail.com", age: "22" },
  { name: "Lily Perez", email: "lily.perez@hotmail.com", age: "26" },
  { name: "Henry Roberts", email: "henry.roberts@outlook.com", age: "40" },
  { name: "Sophie Evans", email: "sophie.evans@gmail.com", age: "47" },
  { name: "David Moore", email: "david.moore@yahoo.com", age: "28" },
  { name: "Grace Stewart", email: "grace.stewart@hotmail.com", age: "34" },
  { name: "Jack Harris", email: "jack.harris@outlook.com", age: "50" },
  { name: "Mia Green", email: "mia.green@gmail.com", age: "21" },
  { name: "Evelyn Clark", email: "evelyn.clark@yahoo.com", age: "38" },
  { name: "Benjamin Lewis", email: "benjamin.lewis@hotmail.com", age: "42" },
  { name: "Zara Hall", email: "zara.hall@outlook.com", age: "29" },
  { name: "Oliver Robinson", email: "oliver.robinson@gmail.com", age: "45" },
  { name: "Charlotte Evans", email: "charlotte.evans@outlook.com", age: "35" },
  { name: "William Collins", email: "william.collins@hotmail.com", age: "37" },
  { name: "Megan Stewart", email: "megan.stewart@yahoo.com", age: "27" },
  { name: "Evan Morris", email: "evan.morris@gmail.com", age: "41" },
  { name: "Madison Howard", email: "madison.howard@outlook.com", age: "33" },
  { name: "David Moore", email: "david.moore@gmail.com", age: "55" },
  { name: "Aiden Parker", email: "aiden.parker@yahoo.com", age: "23" },
  { name: "Ella Scott", email: "ella.scott@hotmail.com", age: "31" },
  { name: "Matthew Lee", email: "matthew.lee@outlook.com", age: "39" },
  { name: "Maya Cooper", email: "maya.cooper@gmail.com", age: "27" },
  { name: "Jasper King", email: "jasper.king@yahoo.com", age: "41" },
  { name: "Oliver Lewis", email: "oliver.lewis@hotmail.com", age: "22" },
  { name: "Isabelle Parker", email: "isabelle.parker@outlook.com", age: "30" },
];

export const addUsersToDB = async () => {
    const db = await initDB();
    const tx = db.transaction(CONSTANTS.USER_STORE, 'readwrite');
    const store = tx.objectStore(CONSTANTS.USER_STORE);
    userData.forEach(user => store.put(user));
    return new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => {
        resolve();
      };
      tx.onerror = (error) => {
        reject(error);
      };
    });
  };
  