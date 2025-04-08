type ErrorGetter = (label: string, error: any) => string;

interface ErrorGetterByDesc {
    key: string;
    getMsg: ErrorGetter;
}

export class ErrorMessageMap {

    static list: ErrorGetterByDesc[] = [
        {key: 'required', getMsg: (label, error) => `Preenchimento obrigatório`},
        {key: 'minlength', getMsg: (label, error) => `${label} deve ter no mínimo ${error.requiredLength} caracteres`},
        {key: 'maxlength', getMsg: (label, error) => `${label} deve ter no máximo ${error.requiredLength} caracteres`},
        {key: 'content', getMsg: (label, error) => `CPF inválido`},
        {key: 'pattern', getMsg: (label, error) => 'Formato inválido'},
        {key: 'min', getMsg: (label, error) => `${label} não pode ser menor que ${error.min}`},
        {key: 'max', getMsg: (label, error) => `${label} não pode ser maior que ${error.max}`},
        {key: 'email', getMsg: (label, error) => `E-mail inválido`},
    ];

    get(key: string, label: string, error: any): string {

        const found = ErrorMessageMap.list.filter((itemList) => itemList.key === key);
        if (found && found.length) {
            return found[0].getMsg(label, error);
        }
        return '';
    }

}

