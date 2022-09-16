export interface CountryMstModel{
    condition?: string;
    country_code?: string;
    country_name?: string;
    currency?: string;
    currency_icon?:string;
}

export interface StateMstModel{
    condition?: string;
    state_code?:string;
    state_name?:string;
    country_code?:string;
}
export interface CityMstModel{
    condition?: string;
    country_code?: string; 
    state_code?: string; 
    city_name?: string; 
    pin_code?: string; 
}
export interface StateMstModel{
    condition?: string;
    country_code?: string;
    country_name?: string;
    currency?: string;
    currency_icon?:string;
}