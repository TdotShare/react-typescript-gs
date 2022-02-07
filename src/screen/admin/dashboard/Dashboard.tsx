import { Alert, AppBar, Container, Grid, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Paperbase from '../../../template/Paperbase'

import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'
import axios from 'axios'

import { systemConfig } from '../../../config/System'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'

import { setLoginfail, deleteUser } from './../../../store/reducer/User'

function Dashboard() {

    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const dispatch = useDispatch()

    const [title] = useState<string>("ภาพรวมระบบ")

    const [refCount, setRefCount] = useState<number>(0)
    const [profileCount, setProfileCount] = useState<number>(0)

    const user = useSelector((state: RootState) => state.user.data)

    const actionGetDashboard = async () => {


        const data = await axios.get<any>(`${systemConfig.API}/dashboard`, { headers: { 'Authorization': `Bearer ${user.token}` } });

        if (data.data.bypass) {
            setProfileCount(data.data.data.profile_count)
            setRefCount(data.data.data.ref_count)
        }

        if (data.data.status === "Unauthorized") {
            dispatch(setLoginfail())
            dispatch(deleteUser())
        }


    }

    useEffect(() => {
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtected.Dashboard, active: false, },
            { value: title, link: "", active: true, }
        ]))
        dispatch(setTitle(title))
        actionGetDashboard()
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
            <Container style={{ padding: "2%" }} >
                <Typography >{`ข้อมูลที่แสดงผลนี้เป็นข้อมูลเฉพาะนักวิจัยที่ลงทะเบียนด้วย rmuti.ac.th`}</Typography>
                <div style={{ paddingBottom: "1%" }}></div>
                <Alert variant="outlined" severity="success">
                    นักวิจัยที่พบใน Google Scholar และถูกเก็บไว้ในระบบนี้ {profileCount}
                </Alert>
                <div style={{ paddingBottom: "1%" }}></div>
                <Alert variant="outlined" severity="success">
                    จำนวนการอ้างอิงทั้งหมด {refCount}
                </Alert>
            </Container>
        </>
    )
}

export default Dashboard