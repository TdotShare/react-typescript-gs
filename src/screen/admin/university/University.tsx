import React, { useEffect, useState } from 'react'
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { TAPIdata, GUniversity } from '../../../model/GUniversity'
import { useSelector } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'
import axios from 'axios'
import { systemConfig } from '../../../config/System'
import swal from "../../../utils/swal"
import { useHistory } from 'react-router';





function University() {


    const history = useHistory()

    const columns: GridColDef[] = [
        { field: 'name_full', headerName: 'ชื่อเต็ม', width: 300 },
        { field: 'name_short', headerName: 'ชื่อย่อ', width: 150 },
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'create_at', headerName: 'สร้างเมื่อ', width: 200 },
        { field: 'update_at', headerName: 'อัปเดตล่าสุดเมื่อ', width: 200 },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => actionDeleteUniversity(params.row.id)}
                        variant="contained"
                    >
                        Delete
                    </Button>
                );
            }
        },
    ];

    const [model, setModel] = useState<GUniversity[]>([])
    const user = useSelector((state: RootState) => state.user.data)

    const dispatch = useDispatch()

    const actionDeleteUniversity = async (id: number) => {

        try {
            const resp = await axios.get<any>(`${systemConfig.API}/university/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (resp.data.bypass) {
                swal.actionSuccess(resp.data.data.message)
                actionGetUniversity()
            } else {
                swal.actionInfo(resp.data.data.message)
            }
        } catch (error) {
            swal.actionError()
        }

    }

    const actionGetUniversity = async () => {
        const data = await axios.get<TAPIdata>(`${systemConfig.API}/university`, { headers: { 'Authorization': `Bearer ${user.token}` } });
        if (data.data.bypass) {
            setModel(data.data.data)
        }
    };

    const [title] = useState<string>("มหาวิทยาลัย")


    useEffect(() => {
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtected.Dashboard, active: false, },
            { value: title, link: "", active: true, }
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
                            <Button onClick={() => history.push(routerPathProtected.UniversityCreate)} variant="contained" sx={{ mr: 1 }}>
                                สร้างรายชื่อมหาวิทยาลัย
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

export default University