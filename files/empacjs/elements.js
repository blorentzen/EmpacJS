// Standard elements for EmpacJS
/** Built by Britton Lorentzen [brittonlorentzen@gmail.com, blorentz.com] */

// Set standard class for all EJS elements
export class EJS_Element {
    constructor(){
        this.type;
        this.id;
        this.classList = [];
        this.attributes = [];
        this.properties = [];
    }

    setID(entry){ this.id = entry; }
    addClass(entry){ this.classList.push(entry); }
    addAttr(key, value){ 
        // If value isn't given, force return with simple key set
        if(value == undefined){ this.attributes.push(key); return; }

        let newObj = new Object;
        newObj.key = key;
        newObj.value = value;
        this.attributes.push(newObj);
    }

    addProp(key, value){
        let newObj = new Object;
        newObj.key = key;
        newObj.value = value;
        this.properties.push(newObj);
    }

    // Method for returning JSON format
    returnJSON(){ return JSON.stringify(this); }
}

// Class for container
export class Container extends EJS_Element {
    constructor(){
        super();
        this.type = 'container';
        this.elements = [];
    }

    addElement(entry){ this.elements.push(entry); }

}

// Classes for text elements
export class Headline extends EJS_Element {
    constructor(theTag){
        super();
        this.type = 'headline';
        this.tag = theTag;
        this.size;
        this.content = 'New Headline';
    }

    setSize(entry){ this.size = size; }
    setContent(entry){ this.content = entry; }
}

export class Text extends EJS_Element {
    constructor(theTag, theContent){
        super();
        this.type = 'text';
        this.tag = theTag;

        if(theContent != undefined){ this.content = theContent; }
        else { this.content = 'New Text Content'; }
    }

    setContent(entry){ this.content = entry; }
}

// Class for images
export class Image extends EJS_Element {
    constructor(theSrc){
        super();
        this.type = 'image';
        this.alt;
        this.size;

        if(theSrc != undefined){ this.src = theSrc; }
        else { this.src = '#' }

    }

    setAlt(entry){ this.alt = entry; }
    setSize(entry){ this.size = entry; }
    setSrc(entry){ this.src = entry; }
}

// Class for setting links and buttons
export class Link extends EJS_Element {
    constructor(theContent, theHref){
        super();
        this.type = 'link';
        this.aria_label;
        this.target = '_self';

        if(theContent != undefined){ this.content = theContent; }
        else { this.content = 'New Link'; };

        if(theHref == undefined){ this.href = theHref; }
        else { this.href = '#'; };
    }

    setAriaLabel(entry){ this.aria_label = entry; }
    setTarget(entry){ this.target = entry; }
    setContent(entry){ this.content = entry; }
    setHref(entry){ this.href = entry; }
}

export class Button extends EJS_Element {
    constructor(theContent, theSubtype){
        super();
        this.type = 'button';
        this.aria_label;

        if(theContent != undefined){ this.content = theContent; }
        else { this.content = 'New Button'; };

        if(theSubtype != undefined){ 
            this.subtype = theSubtype; 

            if(theSubtype == 'image'){
                this.src;
                this.alt_text;
            }
        };

    }

    setAriaLabel(entry){ this.aria_label = entry; }
    setContent(entry){ this.content = entry; }
    setSubtype(entry){ this.subtype = entry; }
    setSrc(entry){ this.src = entry; }
    setAlt(entry){ this.alt = entry; }
}

// Class for setting up videos
export class Video extends EJS_Element {
    constructor(theSubtype, theID, theTitle){
        super();
        this.type = 'video';
        this.subtype = theSubtype;
        this.video_id = theID;
        this.poster;

        if(theTitle != undefined){ this.title = theTitle; }
        else{ this.title = 'New Video' };
    }

    setVid(entry){ this.video_id = entry; }
    setPoster(entry){ this.poster = entry; }
    setTitle(entry){ this.title = entry; }
}