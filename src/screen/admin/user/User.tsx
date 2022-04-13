import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Container, Grid, Toolbar, Typography, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'
import axios from 'axios';
import { systemConfig } from '../../../config/System'
import { useHistory } from 'react-router';

import { useSelector } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'
import { GSprofile, TAPIdata } from '../../../model/Gsprofile'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import swal from "../../../utils/swal"

function User() {

    const columns: GridColDef[] = [
        {
            flex : 1 ,
            field : "FIELD_NOT_EXSITS",
            headerName : "",
            width: 130,
            valueGetter : (params) => params.api.getRowIndex(params.row.id) + 1 ,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={() => actionUpdateProfile(params.row)}
                            variant="contained"
                        >
                            Update Index
                        </Button>
                        <div style={{ margin: 5 }}></div>
                        <Button
                            onClick={() => actionDeleteProfile(params.row.id)}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </>

                );
            }
        },
        {
            field: "image_profile",
            headerName: "รูปภาพประจำตัว",
            sortable: false,
            width: 130,
            renderCell: (params) => {

                const data: GSprofile = params.row

                return (
                    <Avatar alt={`${data.id}`} src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${data.scholar_id}`} />
                );
            }
        },
        {
            field: "name",
            headerName: "ชื่อบนกูเกิลสกอล่า",
            width: 350,
            renderCell: (params) => {

                const data: GSprofile = params.row

                return (
                    <Link component="button" onClick={() => window.open(`https://scholar.google.com/citations?hl=th&authuser=1&user=${data.scholar_id}`, "_blank")} >
                        <Typography >{data.name}</Typography>
                    </Link>
                );
            }
        },
        { field: 'scholar_id', headerName: 'Code GS', width: 150 },
        { field: 'university_name', headerName: 'จากมหาวิทยาลัย', width: 100 },
        { field: 'update_at', headerName: 'อัปเดตล่าสุดเมื่อ', width: 200 },
    ];

    const dispatch = useDispatch()

    const history = useHistory()

    const [title] = useState<string>("โปรไฟล์ G - Scholar")
    const [model, setModel] = useState<GSprofile[]>([])

    const user = useSelector((state: RootState) => state.user.data)


    const actionDeleteProfile = async (id: number) => {

        try {
            const resp = await axios.get<any>(`${systemConfig.API}/gsprofile/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (resp.data.bypass) {
                swal.actionSuccess(resp.data.data)
                actionGetProfile()
            } else {
                swal.actionInfo("ลบข้อมูลไม่สำเร็จ !")
            }
        } catch (error) {
            swal.actionError()
        }

    }

    const actionUpdateProfile = async (data: GSprofile) => {
        try {
            const resp = await axios.get<any>(`https://scholar.google.com/citations?hl=th&authuser=2&user=${data.scholar_id}`)
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(resp.data, 'text/html');
            let str: any = htmlDoc.getElementById("gsc_rsb_st");
            var table: HTMLTableElement = str

            let formatData = {
                scholar_id: data.scholar_id,
                reference: parseInt(table.rows[1].cells[1].innerHTML),
                hindex: parseInt(table.rows[2].cells[1].innerHTML),
                i10index: parseInt(table.rows[3].cells[1].innerHTML),
                reference2016: parseInt(table.rows[1].cells[2].innerHTML),
                hindex2016: parseInt(table.rows[2].cells[2].innerHTML),
                i10index2016: parseInt(table.rows[3].cells[2].innerHTML),
            }

            //console.log(formatData)

            axios.post<any>(`${systemConfig.API}/gsprofile/updateindex`,
                formatData
                , {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then(res => {
                    //console.log(res.data)
                    if (res.data.bypass) {
                        swal.actionSuccess(res.data.data)
                        actionGetProfile()
                    } else {
                        swal.actionInfo("บันทึกข้อมูลไม่สำเร็จ !")
                    }

                })
                .catch(err => {
                    swal.actionError()
                })

        } catch (error) {
            swal.actionInfo(`ไม่สามารถเข้าถึงข้อมูลของ ${data.scholar_id} ได้ !`)
        }

    }

    const actionGetProfile = async () => {
        const data = await axios.get<TAPIdata>(`${systemConfig.API}/gsprofile`, { headers: { 'Authorization': `Bearer ${user.token}` } });
        if (data.data.bypass) {
            setModel(data.data.data)
        }
    };


    useEffect(() => {
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtected.Dashboard, active: false, },
            { value: title, link: "", active: true, }
        ]))
        dispatch(setTitle(title))
        actionGetProfile()
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
                            <Button disabled variant="contained" sx={{ mr: 1 }}>
                                เพิ่มข้อมูลนักวิจัย GS (API)
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => history.push(routerPathProtected.UserCreate)} variant="contained" sx={{ mr: 1 }}>
                                เพิ่มข้อมูลนักวิจัย GS (Manual)
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container >
                <div style={{ padding: '2%', height: 500, width: '100%' }}>
                    <DataGrid
                        rows={model ? model : []}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick={true}
                    />
                </div>
            </Container>
        </>
    )
}

export default User