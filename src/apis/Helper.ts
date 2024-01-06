import { Alert } from "react-native";
import { Utils } from "../common/util";

export default class Helper {

    constructor() {

    }

    /**
     * Check for, is object empty?
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static isObjectEmpty(obj: Object, cb?: Function) {
        let names = Object.getOwnPropertyNames(obj);
        return Promise.resolve({ status: (names.length === 0) ? true : false, names });
    }

    /**
     * Check for, is data array format?
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static isDataArray(obj: Array<any>, cb: Function) {
        cb(obj.length !== undefined ? true : false);
    }

    /**
     * For sorting
     * @param {*any} a 
     * @param {*any} b 
     */
    static compare(a: { name: string }, b: { name: string }) {
        if (a?.name < b?.name)
            return -1;
        if (a?.name > b?.name)
            return 1;
        return 0;
    }

    /**
     * Validate email address
     * @param {*string} email 
     */
    static validateEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    /**
        * Validate User name
        * @param {*string} email 
        */
    static validateUserName(userName: string) {
        var re = /^[a-zA-Z0-9._]+$/;
        return re.test(userName);
    }

    /**
     * Mask Card
     * @param {*string} cardNumber
     */
    static MakeCardMask(cardNumber: string) {

        cardNumber = cardNumber.replace(/\D/gi, '');
        if (cardNumber.length < 5) return cardNumber;

        cardNumber = cardNumber.replace(/(\d{4})/, '$1-');
        cardNumber = cardNumber.replace(/(\d{4})(\d{1})/, '$1-$2');
        cardNumber = cardNumber.replace(/(\d{4})(\d{1})/, '$1-$2');
        cardNumber = cardNumber.replace(/(\d{4})(\d{1})/, '$1-$2');


        return cardNumber
    }

    /**
     * Mask Date
     * @param {*string} date
     */
    static MakeDateMask(dateNumber: string) {

        dateNumber = dateNumber.replace(/\D/gi, '');

        if (dateNumber.length < 3) return dateNumber;

        dateNumber = dateNumber.replace(/(\d{2})/, '$1/');

        return dateNumber
    }

    /**
     * Mask Phone Number
     * @param {*string} phone_number
     */
    static MakePhoneNumberMask(phone_number: string) {

        phone_number = phone_number.replace(/\D/gi, '');
        phone_number = phone_number.replace(/(\d{3})/, '$1-');
        phone_number = phone_number.replace(/(\d{3})(\d{1})/, '$1-$2');
        phone_number = phone_number.replace(/(\d{4})(\d{1})/, '$1-$2');

        return phone_number
    }

    /**
     * Validate mobile
     * @param {*string} number
     */
    static validateMobile(number: string) {
        // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (number && number.length >= 10 && number.length <= 12);
    }

    /**
     * Validate name
     * @param {*string} value
     */
    static validateName(value: string) {
        return (value && value.length >= 3 && value.length <= 20);
    }

    /** Validate password */
    static validatePassword = (value: string) => {
        const data = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        return data.test(value);
    }

    /**
     * Merge objects
     * @param {*object} obj 
     * @param {*function} oldObj 
     */
    static mergeObject(obj: Object, oldObj: Object) {
        return Object.assign(obj, oldObj)
    }

    /**
    * Validate the request 
    * @param {*object} obj 
    */
    static validate(parameters: any, obj: any) {
        return this.isObjectEmpty(obj)
            .then(({ status, names }) => {
                // console.log("names", status, names);
                if (!status) {
                    let existedFields = {
                        keys: names,
                        emptyKeys: [] as any
                    }
                    parameters.forEach((element: any, index) => {
                        !obj[element] && existedFields.emptyKeys.push({ fieldName: element, message: "Required" });
                    });

                    //Specific fields validations
                    // existedFields.emptyKeys.length <= 0 &&
                    existedFields.keys.forEach((element) => {
                        switch (element) {
                            case "email":
                                !this.validateEmail(obj["email"]) && existedFields.emptyKeys.push({ fieldName: element, message: "Email is not valid." })
                                break;
                            case "mobile_number":
                                !this.validateMobile(obj["mobile_number"]) && existedFields.emptyKeys.push({ fieldName: element, message: "Mobile number is not valid." });
                                break;
                            case "password":
                                !this.validatePassword(obj["password"]) && existedFields.emptyKeys.push({ fieldName: element, message: "Password must have one uppercase, one lowercase, one special character, one number and at least 8 characters long." });
                                break;
                            case "confirmPassword":
                                if (obj["password"] !== obj["confirmPassword"]) {
                                    existedFields.emptyKeys.push({ fieldName: "password", message: "Password is not matched." });
                                    existedFields.emptyKeys.push({ fieldName: "confirmPassword", message: "Password is not matched." });
                                }
                                break;
                        }
                    });

                    return Promise.resolve({ status: existedFields.emptyKeys.length > 0 ? false : true, response: existedFields.emptyKeys });
                } else return Promise.resolve({ status: false, response: parameters });
            });
    }

    static isValidForm = (keys: any, body: any) => {
        return Helper.validate(keys, body)
            .then(({ status, response }): any => {
                if (status) {
                    return Promise.resolve({ status, message: "Success" });
                } else return Promise.resolve({ status, response });
            })
    }

    /** Reset and push rout in stack */
    static resetAndPushRoot(history: any, path: any) {
        history.entries = [];
        history.index = -1;
        history.push(path);
    }

    // Format email to hidden format
    static stripEmailDelimiter(email:string) {
        // Use a regular expression to remove everything after the '+' symbol and before the '@' symbol
        return email.replace(/(\+.*)@/, '@');
      }

}

export function formatEmail(email: string): string {
    const atIndex = email.indexOf('@');

    if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
        return email; // Return original email if "@" is not present, or "@" is the first or last character
    }

    const [username, domain] = email.split('@');
    const [domainName, domainExtension] = domain.split('.');

    if (domainExtension) {
        // Replace characters in the username and domain (except first and last characters) with '•'
        const formattedUsername = username.charAt(0) + '•'.repeat(5) + username.charAt(username.length - 1);
        const formattedDomainName = domainName.charAt(0) + '•'.repeat(5) + domainName.charAt(domainName.length - 1);

        // Combine the formatted username, domain name, and domain extension with "@" and "."
        const formattedEmail = `${formattedUsername}@${formattedDomainName}.${domainExtension}`;

        return formattedEmail;
    }

    // If there's no domain extension, return the original email
    return email;
}


export function scorePassword(pass: string) {
    let score: any = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters: any = new Object();
    for (var i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    const variations: any = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (const check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}


export const showAlert = (title: string, body: string) => {
    Alert.alert(
        title,
        body,
        [
            {
                text: 'OK',
                onPress: () => Utils.log('OK Pressed'),
            },
        ],
        { cancelable: false }
    );
};