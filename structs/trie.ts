class Node {
	children = []; //store next letter; eg. 'c' in children[2]
	isLeaf = false; //not a end of word currently
}

class Trie {
	root = new Node()
	insert(str) {
		curr = this.root;
		for(ch of str) {
			idx = ch.charCodeAt() - 'a'.charCodeAt();
			curr.children[idx] ??= new Node()
			curr = curr.children[idx] 
		}
		curr.isLeaf = true;
	}
	search(str) {
		curr = this.root
		for(ch of str) {
			idx = ch.charCodeAt() - 'a'.charCodeAt();
			if(curr.children[idx] === undefined) return false
			curr = curr.children[idx]
		}
		return curr.isLeaf
	}
}

// how to run
let arr = ['and', 'ant', 'trap', 'trans'], trie =  new Trie()
for(word of arr) trie.insert(word)
