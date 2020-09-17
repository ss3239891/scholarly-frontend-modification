import { API } from "./";

export const getAllCompanies = async (page, selectedFilter)=>{
    try {
        const reqbody = {filter: selectedFilter}
        const response = await fetch(`${API}/company/all`, {
            method: "POST", 
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(reqbody)
        }); 
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const getCompany = async (id)=>{
    try {
        const response = await fetch(`${API}/company/get`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json'
            },
            body: JSON.stringify({id: id})
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const getProfile = async (email) => {
    try {
        const response = await fetch(`${API}/auth/getprofile`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json'
            },
            body: JSON.stringify({email})
        })
        return response.json()
    } catch (err) {
        return console.log(err)
    }
}

export const updateProfile = async (profile) => {
    try {
        const response = await fetch(`${API}/auth/updateprofile`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json'
            },
            body: JSON.stringify({profile})
        })
        return response.json()
    } catch (error) {
        return console.log(error)
    }
}

export const signUp = async (user) => {
    try {
        const response = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                password: user.password
            })
        })
        return response.json()
    } catch (error) {
        return console.log(error)
    }
}

export const resendEmail = async (email) => {
    try {
        const response = await fetch(`${API}/auth/resendemail`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'content-type': 'application/json'
            },
            body: JSON.stringify({email})
        })
        return response.json()
    } catch (error) {
        return console.log(error)
    }
}