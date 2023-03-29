let test = 'name=Abdulrahim&type=margherita&base=cheesy+crust&topping%5B%5D=peppers&topping%5B%5D=garlic';

let newStr = test.split('&');
console.log(newStr);

const parsBody = (body) => {
    let bodyEle = body.split('&');

    const bodyprop = ['name', 'type', 'base', 'topping'];

    let reqBody = {
        name: '',
        type: '',
        base: '',
        topping: []
    }

    const steBody = () => {
        for(let i = 0; i < bodyEle.length; i++){
            if(reqBody[i] == 'topping'){
                for(let j = i; j < bodyEle.length; j++){
                    reqBody[bodyprop[i]].push(reqBody[j]);
                }
                break;
            }
            reqBody[bodyprop[i]] = bodyEle[i]
        }
    }
    steBody();
    return reqBody;
}


console.log(parsBody(test))

// name=Abdulrahim&type=margherita&base=cheesy+crust&topping%5B%5D=peppers&topping%5B%5D=garlic