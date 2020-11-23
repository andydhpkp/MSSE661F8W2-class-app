{
    {
        {
            {
                function a() {
                    console.log('running in my own scope');
                }
            }
        }
    }
}
  

console.log('EMPTY SCOPE', this);
  
function b() {
    console.log('GLOBAL', this);
}
  
const c = () => {
    console.log('MY SCOPE', this); 
};
  
const d = {
    b: function () {
      console.log('OBJECT CONTEXT', this);
    },
    c: () => {
      console.log('OWN CONTEXT', this);
    },
};
  
const arr = [1, 2, 3, 4, 5];
const [first, ...otherNumbers] = arr;
console.log('rest', first, otherNumbers);

const copy = [...otherNumbers];
console.log('spread', copy);

const obj = { name: 'bob', age: 50 };
const { name, age } = obj;
console.log(name, age);

const copyObj = { age };
console.log('spread object', copyObj);
  
const p = new Promise((resolve, reject) => {
    resolve(true);
});
  
const getTrue = async () => {
    return await p;
};