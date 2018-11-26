'use strict'

class Node{
	constructor(value){
		this._val = value;
		this.next = null;
	    this.prev = null;
	}
	get val(){
		return this._val;
	}
	
	includes(value, propNext){
		if(value === this._val) return true 
		return !this[propNext] ? false : this[propNext].includes(value); 
	}
	each(position, propNext){
		if(position===0) return this;
		return !this[propNext] ? undefined : this[propNext].each(--position);
	}
	fillArray(arr, a, propNext){
		arr[a]=this._val;
		if(this[propNext]) this[propNext].fillArray(arr, ++a, propNext);
	}

    forEach(func, propNext, index, list){
		func(this._val, index, list);
		index++;
		if(this[propNext]) this[propNext].forEach(func, propNext, index, list);
	}
	
}

class List{
	constructor(){
		this.propNext = 'next';
	    this.propPrev = 'prev';
		this.propHead = 'head';
		this.propTail = 'tail';
		this.head = undefined;
		this.tail = undefined;
		this.length = 0;
	}

	set(value, position)
	{
		let tmp = this.each(position);
		if(tmp == null || !tmp[this.propNext])
		{
			return this.push(value);
		}

		if(!tmp[this.propPrev])
		{
			return this.unshift(value);
		}
		let elem = new Node(value);
		this.length++;
		elem[this.propPrev] = tmp[this.propPrev];
		tmp[this.propPrev] = elem;
		elem[this.propNext] = tmp;
		elem[this.propPrev][this.propNext] = elem;
		return this.length;

	}

	push(value){
		return this.add(value,this.propTail,this.propHead, this.propPrev, this.propNext)
	}

	unshift(value){
		return this.add(value, this.propHead, this.propTail, this.propNext, this.propPrev)
	}

	add(value, propHead, propTail, propNext, propPrev){
		this.length++;
		var elem = new Node(value);
		if(!this[propHead] && !this[propTail]){
			
			this[propHead]=this[propTail]=elem;
		}
		else{
			this[propHead][propPrev] = elem;
			elem[propNext] = this[propHead];
			this[propHead] = elem;
		}
		return this.length;
	}
	

	pop(){
        return this.del( this.propTail, this.propHead, this.propPrev, this.propNext);
	}

	shift(){
		return this.del(this.propHead, this.propTail, this.propNext, this.propPrev);
	}

	del(propHead, propTail, propNext, propPrev){
        let tmp = this[propHead] || {};
        this[propHead] = tmp[propNext];
        if(this[propHead]==undefined){
            this[propTail]=undefined;
        }
        else{
            this[propHead][propPrev] = null;
        }

        this.length = (--this.length) < 0 ? 0 : this.length;
        return tmp.val;
	}

	log(){
		console.log(this[this.propHead]);
		console.log(this[this.propTail]);
	}

	includes(value){
		return this[this.propHead].includes(value, this.propNext);
	}

	each(position){
		if(!this[this.propHead]) return undefined;
		return this[this.propHead].each(position, this.propNext);
	}

	reverse(){
		[this.propHead, this.propTail] = [this.propTail, this.propHead];
		[this.propNext,this.propPrev] = [this.propPrev, this.propNext];
	}

	toArray(){
		if(this.head){
		let arr = new Array(this.length);
		this[this.propHead].fillArray(arr, 0, this.propNext);
		return arr;
    	}
	}

	forEach(func){
		if(this.head)
        this[this.propHead].forEach(func, this.propNext, 0, this)
	}

}
var myList = new List();
/*myList.push(1230);
myList.push(555);
myList.push(777);
myList.unshift('Тестим аншифт');
myList.set( "Тестим сет", 1);
myList.push(512);
myList.set( "Самый первый элемент", 0);
myList.push('Пуш после реверса');
myList.unshift('Unshift после реверса')
myList.log();
console.log(myList.toArray());
console.log(myList.pop());
console.log(myList.shift());
myList.log();*/
myList.forEach(function(elem){
	console.log(elem);
	}
);
myList.toArray();