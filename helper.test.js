const {ProcessRequest} = require('./helper')


describe("running test for ProcessRequest class correct responce", () => {

    let process_request;

    beforeEach( () => {
        
        process_request = new ProcessRequest('2,6,9,5,2')
    
    });

    test('test mean method', () => {
        
        expect(process_request.mean()).toEqual({"operation": "mean", "value": 4.8})
   
    });

    test('test median method', () => {
        
        expect(process_request.median()).toEqual({"operation": "median", "value": 5})
   
    });

    test('test mode method', () => {
        
        expect(process_request.mode()).toEqual({"operation": "mode", "value": ["2"]})
   
    });


});

describe("running test for ProcessRequest class by providing incorrect data", () => {


    test('test to call class by providing string instead number', () => {

        try{

            new ProcessRequest('2,foo,9,5,2')

        }catch(err){

            expect(`${err}`).toEqual("Error: foo is not a number")
            
        }
    
    });

    test('test to call class by providing empty string', () => {

        try{

            new ProcessRequest('')

        }catch(err){

            expect(`${err}`).toEqual("Error: nums are required")

        }
    
    });


});