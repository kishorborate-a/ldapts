"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDN = void 0;
/**
 * RDN is a part of DN and it consists of key & value pair. This class also supports
 * compound RDNs, meaning that one RDN can hold multiple key & value pairs.
 */
class RDN {
    constructor(attrs) {
        this.attrs = {};
        if (attrs) {
            Object.keys(attrs).forEach((name) => this.set(name, attrs[name]));
        }
    }
    /**
     * Set an RDN pair.
     * @param {string} name
     * @param {string} value
     * @returns {object} RDN class
     */
    set(name, value) {
        this.attrs[name] = value;
        return this;
    }
    /**
     * Get an RDN value at the specified name.
     * @param {string} name
     * @returns {string} value
     */
    get(name) {
        return this.attrs[name];
    }
    /**
     * Checks, if this instance of RDN is equal to the other RDN.
     * @param {object} other
     */
    equals(other) {
        const ourKeys = Object.keys(this.attrs);
        const otherKeys = Object.keys(other.attrs);
        if (ourKeys.length !== otherKeys.length) {
            return false;
        }
        ourKeys.sort();
        otherKeys.sort();
        for (let i = 0; i < ourKeys.length; i += 1) {
            if (ourKeys[i] !== otherKeys[i]) {
                return false;
            }
            if (this.attrs[ourKeys[i]] !== other.attrs[ourKeys[i]]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Parse the RDN, escape values & return a string representation.
     * @returns {string} Escaped string representation of RDN.
     */
    toString() {
        let str = '';
        const keys = Object.keys(this.attrs);
        keys.forEach((key) => {
            if (str.length) {
                str += '+';
            }
            str += `${key}=${this._escape(this.attrs[key])}`;
        });
        return str;
    }
    /**
     * Escape values & return a string representation.
     *
     * RFC defines, that these characters should be escaped:
     *
     * Comma                          ,
     * Backslash character            \
     * Pound sign (hash sign)         #
     * Plus sign                      +
     * Less than symbol               <
     * Greater than symbol            >
     * Semicolon                      ;
     * Double quote (quotation mark)  "
     * Equal sign                     =
     * Leading or trailing spaces
     *
     * @param {string} value - RDN value to be escaped
     * @returns {string} Escaped string representation of RDN
     */
    _escape(value) {
        let str = '';
        let current = 0;
        let quoted = false;
        const len = value.length;
        const escaped = /[\\"]/;
        const special = /[,=+<>#;]/;
        if (len > 0) {
            // Wrap strings with trailing or leading spaces in quotes
            quoted = value.startsWith(' ') || value[len - 1] === ' ';
        }
        while (current < len) {
            if (escaped.test(value[current]) || (!quoted && special.test(value[current]))) {
                str += '\\';
            }
            str += value[current];
            current += 1;
        }
        if (quoted) {
            str = `"${str}"`;
        }
        return str;
    }
}
exports.RDN = RDN;
//# sourceMappingURL=RDN.js.map