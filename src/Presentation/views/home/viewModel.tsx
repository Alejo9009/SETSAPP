import React, { useState } from 'react'
const HomeViewModel = () => {
    const [values, setValues] = useState({
        Usuario: '',
        Clave: '',

    });
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }
    return {
        ...values,
        onChange
    }
}
export default HomeViewModel;