import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { historyModifyRequest } from "../reducer/historySlice";



export default function TimelineModify(history) {
    const dispatch = useDispatch()
    const [mode, setMode] = useState(0)
    const today = new Date()
    const ModifyValues = {
        id: history['history'].id,
        user_id: 1, //로그인 되면 id 넣기
        log_type: '',
        contents: '',
        location: '',
        address: '',
        log_date: '',
        weather: '',
    }
    const { control, formState, handleSubmit, reset, getValues } = useForm({
        mode: 'onChange',
        ModifyValues,
    });
    // const { isValid, dirtyFields, errors } = formState;
    function onSubmit() {
        reset(ModifyValues);
    }
    return (<>
        {mode == 0 ? <>
            <p>{JSON.stringify(history["history"].contents)}</p>
            <Button variant="text" onClick={() => setMode(1)}>수정 하기</Button>
            <Button variant="text">삭제 하기</Button></>
            : <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit= {handleSubmit(async (data) => { await dispatch(historyModifyRequest({
                    ...data,
                   })) })}>
                <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ width: '20ch' }}>
                    <Controller
                        name="log_date"
                        label="날씨"
                        control={control}
                        render={({ field }) => (
                            <DateTimePicker
                                {...field}
                                renderInput={(field) => <TextField {...field} />
                                }
                            />)}/>
                </LocalizationProvider>

                <FormControl sx={{ width: '15ch' }}>
                    <InputLabel id="weather-select-label">날씨</InputLabel>
                    <Controller
                        name="weather"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="weather-select-label"
                                id="weather-select"
                                // value={value}
                                label="weather"
                            // onChange={handleChange}
                            >
                                <MenuItem value={'맑음'}>맑음</MenuItem>
                                <MenuItem value={'구름 많음'}>구름 많음</MenuItem>
                                <MenuItem value={'흐림'}>흐림</MenuItem>
                                <MenuItem value={'비'}>비</MenuItem>
                                <MenuItem value={'비/눈'}>비/눈</MenuItem>
                                <MenuItem value={'눈'}>눈</MenuItem>
                                <MenuItem value={'소나기'}>소나기</MenuItem>
                                <MenuItem value={'데이터 없음'}>모르겠음!</MenuItem>
                            </Select>
                        )} />
                </FormControl>
                <FormControl sx={{ width: '15ch' }}>
                    <InputLabel id="category-select-label">카테고리</InputLabel>
                    <Controller
                        name="log_type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="category-select-label"
                                id="category-select"
                                // value={value}
                                label="category"
                            // value="normal"
                            // onChange={handleChange}
                            >
                                <MenuItem value={'normal'}>일반</MenuItem>
                                <MenuItem value={'visit'}>방문</MenuItem>
                                <MenuItem value={'payment'}>결제 내역</MenuItem>
                                <MenuItem value={'study'}>공부</MenuItem>
                            </Select>
                        )} />
                </FormControl>
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="장소" variant="outlined" sx={{ width: '20ch' }} placeholder="방문 장소" />
                    )} />
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="주소" variant="outlined" sx={{ width: '20ch' }} placeholder="상세 주소" />
                    )} />
                <br />
                <Controller
                    name="contents"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="text"
                            id="outlined-basic" label="내용" variant="outlined"
                            sx={{ width: '100.5ch' }} placeholder="무엇을 했다!"
                        />
                    )} />
                <br />
                <Button variant="text" type="submit">수정 완료</Button>
                <Button variant="text">삭제 하기</Button>
            </Box>}
    </>)
}