const fs = require('fs')


class ProcessRequest {

    constructor(str_nums){

        if(!String(str_nums).length){

            throw new ExpressErro('nums are required', '400 Bad Request');

        }


        let temp_strg_arr = String(str_nums).split(",");


        this.nums = temp_strg_arr.map( val =>{

            if(isNaN(val)){

                throw new ExpressErro(`${val} is not a number`, '400 Bad Request');

            }else{

                return parseInt(val)

            }
        });

    }

    mean(){

        let total = this.nums.reduce( (sum, val) => { return sum += val }, 0) / this.nums.length;
        return {'operation': 'mean', 'value': parseInt(total)}

    }

    median(){

        let sorted_arr = this.nums.sort((a,b)=>{ return a - b });
        let total = (sorted_arr.length % 2 == 0)?
                        (sorted_arr[(sorted_arr.length / 2) - 1] + sorted_arr[sorted_arr.length / 2]) / 2:
                            sorted_arr[(sorted_arr.length - 1) / 2];
                            
        return {'operation': 'median', 'value': total}

    }

    mode() {
        
        let obj = this.nums.reduce((val_obj, key) => { 

            val_obj.hasOwnProperty(key)? val_obj[key]++ : val_obj[key] = 0;
            return val_obj

        }, {});

        let temp_arr = []

        Object.keys(obj).map(val => { 
            if(obj[val] != 0){
                temp_arr.push(val)
            }
        });

        
        return {'operation': 'mode', 'value': temp_arr.length != 0? temp_arr: this.nums};

    }


    all(){

        let mean = this.mean()
        let median = this.median()
        let mode = this.mode()

        return {

            "operation": "all",
            "mean": mean['value'],
            "median": median['value'],
            "mode": mode['value'],

        }
    }

    save_in_file(json_str){

        fs.writeFile('./results.json', `${json_str}\r\n`, {encoding: "utf8", flag:"a+"}, err => {

            if(err){

                console.log(`Error : ${err}`);
                process.exit(1)
                
            }

            console.log('File successfully written!');

        });

    }

}


class ExpressErro extends Error{

    constructor(message, status){

        super();
        this.message = message;
        this.status = status;

    }

}

module.exports = {
    ProcessRequest : ProcessRequest,
};