import React, { useEffect, useState } from 'react'
import Paperbase from '../../../template/Paperbase'
import { AppBar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography, SelectChangeEvent } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'


import { useSelector } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'
import swal from "../../../utils/swal"
import axios from 'axios'
import { systemConfig } from '../../../config/System'
import { GUniversity, TAPIdata } from '../../../model/GUniversity'

function UserCreate() {

    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const dispatch = useDispatch()

    const [title] = useState<string>("โปรไฟล์ G - Scholar - สร้าง")

    const user = useSelector((state: RootState) => state.user.data)

    const [model, setModel] = useState<GUniversity[]>([])
    const [selectUnivers, setSelectUnivers] = useState<string>('')

    const actionGetUniversity = async () => {
        const data = await axios.get<TAPIdata>(`${systemConfig.API}/university`, { headers: { 'Authorization': `Bearer ${user.token}` } });
        if (data.data.bypass) {
            setModel(data.data.data)
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('scholar_id') && data.get('name') && data.get('gs_university_id')) {
            axios.post<any>(`${systemConfig.API}/gsprofile/create`,
                {
                    scholar_id: data.get('scholar_id'),
                    name: data.get('name'),
                    gs_university_id: data.get('gs_university_id')
                }
                , {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then(res => {

                    if (res.data.bypass) {
                        swal.actionSuccess(res.data.data)
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

    const handleChange = (event: SelectChangeEvent) => {
        setSelectUnivers(event.target.value as string);
    };

    useEffect(() => {
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtected.Dashboard, active: false, },
            { value: "โปรไฟล์ G - Scholar", link: routerPathProtected.User, active: false, },
            { value: "สร้าง", link: "", active: true, }
        ]))
        dispatch(setTitle(title))
        actionGetUniversity()
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

                    sx={{ m : 2}}

                >
                    <Grid container spacing={2} columns={12} >
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <TextField
                                fullWidth
                                required
                                name="scholar_id"
                                label="Google-Scholar-ID"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                required
                                name="name"
                                label="ชื่อที่แสดงบน Google-Scholar"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">เลือกมหาวิทยาลัย</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name={`gs_university_id`}
                                    value={selectUnivers}
                                    label="เลือกมหาวิทยาลัย"
                                    onChange={handleChange}
                                >
                                    {model.map(({ id , name_short}) => (
                                        <MenuItem key={id} value={id}>{name_short}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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

export default UserCreate