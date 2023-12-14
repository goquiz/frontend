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
        generated[error.field] = ['error.' + error.tag, error.value]
    })
    return generated
}

export default translator