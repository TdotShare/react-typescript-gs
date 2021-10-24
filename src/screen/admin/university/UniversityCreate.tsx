import React, { useEffect, useState } from 'react'
import Paperbase from '../../../template/Paperbase'
import { AppBar, Button, Container, Grid, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'
import Box from '@mui/material/Box';



import { useSelector } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'
import swal from "../../../utils/swal"
import axios from 'axios'
import { systemConfig } from '../../../config/System'

function UniversityCreate() {

    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const dispatch = useDispatch()

    const [title] = useState<string>("มหาวิทยาลัย - สร้าง")

    const user = useSelector((state: RootState) => state.user.data)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('name_full') && data.get('name_short') && data.get('email')) {
            axios.post<any>(`${systemConfig.API}/university/create`,
                {
                    name_full: data.get('name_full'),
                    name_short: data.get('name_short'),
                    email: data.get('email')
                }
                , {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then(res => {

                    if (res.data.bypass) {
                        swal.actionSuccess(res.data.data.message)
                    } else {
                        swal.actionInfo("สร้างข้อมูลไม่สำเร็จ !")
                    }

                })
                .catch(err => {
                    swal.actionError()
                })
        } else {
            swal.actionInfo("กรุณากรอกข้อมูลให้ครบ")
        }
    }


    useEffect(() => {
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtected.Dashboard, active: false, },
            { value: "มหาวิทยาลัย", link: routerPathProtected.University, active: false, },
            { value: "สร้าง", link: "", active: true, }
        ]))
        dispatch(setTitle(title))
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography >{title}</Typography>
                        </Grid>
                        <Grid item>

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container >
                <Box component="form" onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}

                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} >
                            <TextField
                                required
                                name="name_full"
                                label="ชื่อเต็มมหาวิทยาลัย"
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={4}>
                            <TextField
                                required
                                name="name_short"
                                label="ชื่อย่อมหาวิทยาลัย"
                            />
                        </Grid>
                        <Grid item  xs={12} sm={12} md={4}>
                            <TextField
                                required
                                name="email"
                                label="email : มหาวิทยาลัย"
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        เพิ่มข้อมูล
                    </Button>

                </Box>
            </Container>
        </>
    )
}

export default UniversityCreate