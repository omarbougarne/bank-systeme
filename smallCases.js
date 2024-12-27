

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const newArr =  new Array(...arr) // [...arr]

// map vs forEach

// const mapArr = arr.map((item) => item * 2); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
// const forEachArr = arr.forEach((item) => item * 2); // undefined



// functional Programming Or Streams

// const StudentBuilder = function (data) {
//     this.data = data;
//     this.edit = (key, value) => {
//         this.data[key] = value;
//         return this;
//     }
//     this.print = () => {
//         console.log(data)
//     }
// }


// new StudentBuilder({name:"OMAR"}).edit('name', "zoubir").edit('age',"99").print();


const ArrayOmar = function (arguments){
    if(array instanceof Array){
        this.data = array;
    }
    else{
        this.data = [array, data];
    }
    this.map = (callback) => {
        console.log(this.data.length)
        const newArr = []
        for(let i = 0 ; i < this.data.length; i++){
            newArr.push(callback(this.data[i], i))
        }
        return newArr;
    }

}

new ArrayOmar(["fghjk","fghj","fghj"]).map((data, index) => index)