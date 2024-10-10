import React, { useState } from 'react';

import { Success } from "../components/Success"
export function AfterLogout() {
    return <Success label={'Logout Successfull'} buttonLabel = {'Done'} to={'/signin'}
></Success>
}