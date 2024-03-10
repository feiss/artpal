
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);
const $c = el => document.createElement(el);

function setup_drag_n_drop(handle) {
    let dropZone = document.body;
    dropZone.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    dropZone.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        if (files.length == 0) { return; }

        let reader = new FileReader();
        reader.onload = function (e2) {
            handle(e2.target.result);
        }
        reader.readAsDataURL(files[0]);
    });
}



class Option {
    constructor(v, is_some) {
        this.v = v;
        this.is_some = is_some;
    }

    is_none() {
        return !this.is_some;
    }

    is_some() {
        return this.is_some;
    }

    unwrap() {
        return this.v;
    }

    is(v) {
        return this.is_some && this.v === v;
    }
}

function Some(v) {
    return new Option(v, true);
}
function None() {
    return new Option(null, false);
}