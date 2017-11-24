export const flatten = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);

export function elemClassByValue (value) {
    let className = "";

    switch (value) {
        case 1: {
            className = "square";
            break;
        }
        case 2: {
            className = "bar";
            break;
        }
        case 3: {
            className = "t";
            break;
        }
        case 4: {
            className = "s";
            break;
        }
        case 5: {
            className = "z";
            break;
        }
        case 6: {
            className = "j";
            break;
        }
        case 7: {
            className = "l";
            break;
        }

        default: className = "";
    }

    return className;
}