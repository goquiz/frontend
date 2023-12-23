type TError = {
    field: string;
    tag: string;
    value: string|null;
}

type TErrors = Array<TError>

export type IInputError = [string, string|null]

export type TInputError = Record<string, IInputError>

const translator = (errors: TErrors): TInputError => {
    const generated: TInputError = {}
    errors.forEach((error: TError) => {
        if(error.field.includes("[") && error.field.includes("]")) {
          const arrayFieldKey = error.field.substring(
              error.field.indexOf("[") + 1,
              error.field.lastIndexOf("]")
          );
          generated[error.field.replace("[" + arrayFieldKey + "]", "") + "." + arrayFieldKey] = ["error." + error.tag, error.value]
        } else generated[error.field] = ['error.' + error.tag, error.value]
    })
    return generated
}

export default translator