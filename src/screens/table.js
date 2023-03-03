import React from 'react'

function table() {
    return (
        <div>table
            <table>
                <tbody>
                    <td style={{ width: "30%" }}>Document</td>

                    <td>
                        Image
                        <div className="image-upload">
                            <img src='images/upload.png' />
                            <input id="file-input" type="file" className='p-input'
                                value={prescription.image}
                                onChange={(e) => handleImageUpload(e.target.files[0])} />
                            <label id="markImageAttached" ></label>
                        </div>
                    </td>

                    <td> Video
                        <div className="image-upload">
                            <img src='images/video.png' />
                            <input id="video-file-input"
                                value={prescription.video}
                                onChange={(e) => handleVideoUpload(e.target.files[0])}
                                type="file" />
                            <label id="markVideoAttached" ></label>

                        </div>
                    </td>
                    <td> Report
                        <div className="image-upload">
                            <img src='images/medical-report.png' />
                            <input id="report-file-input"
                                value={prescription.report}
                                onChange={(e) => handleReportUpload(e.target.files[0])}
                                type="file" />
                            <label id="markReportAttached" ></label>

                        </div>
                    </td>

                    <td>
                        Diet
                        <div className="image-upload">
                            &nbsp;&nbsp;
                            <img src='images/cereal.png' onClick={handleShow} />
                            <Modal
                                show={show}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Diet Chart</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <input
                                                    id="dos"
                                                    defaultChecked
                                                    type="radio"
                                                    value="1"
                                                    name="allowance"

                                                    onChange={headerChange}
                                                />
                                                <label htmlFor="dos">Do's</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    id="dont"
                                                    type="radio"
                                                    value="2"
                                                    name="allowance"
                                                    onChange={headerChange}
                                                />
                                                <label htmlFor="dont">Dont's</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    id="Occasional"
                                                    type="radio"
                                                    value="3"
                                                    name="allowance"
                                                    onChange={headerChange}
                                                />
                                                <label htmlFor="Occasional">Occasional</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    id="Omit"
                                                    type="radio"
                                                    value="4"
                                                    name="allowance"
                                                    onChange={headerChange}
                                                />
                                                <label htmlFor="Omit">Omit</label>
                                            </div>
                                            <div className="col">
                                                <input
                                                    id="all"
                                                    type="button"
                                                    value="all"
                                                    name="allowance"
                                                    onClick={handelAllButtonClick}
                                                />
                                                <label htmlFor="all">All</label>
                                            </div>
                                            <div className="col">
                                                <Button variant="success" onClick={() => handelInstructionShow()} >Import</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                dietCategories.map((category, index) => {
                                                    return <div className='categoryClass' style={{ display: 'flex', flexDirection: 'column', margin: '0 10px' }}>
                                                        {category}
                                                        {
                                                            DiechartList?.filter((elem) => { return elem.category == category }).map((diet, index) => (
                                                                <div key={index}>
                                                                    {
                                                                        <span
                                                                            onClick={handelMarkState}
                                                                            id={"lb" + diet.id}
                                                                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                                                                            dangerouslySetInnerHTML={{ __html: getUniCodeFromId(dietArray.find((elem) => { return diet.id == elem.diet.id })?.allowance) }}
                                                                        ></span>
                                                                    }

                                                                    <label htmlFor={"lb" + diet.id}> {diet.name}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <InputGroup>
                                                    <InputGroup.Text >What to do</InputGroup.Text>
                                                    <Form.Control id={'what_todo'} as="textarea" aria-label="With textarea" />
                                                </InputGroup>
                                            </div>
                                            <div className="col">
                                                <InputGroup>
                                                    <InputGroup.Text>What to don't</InputGroup.Text>
                                                    <Form.Control id={'what_todont'} as="textarea" aria-label="With textarea" />
                                                </InputGroup>
                                            </div>
                                        </div>

                                    </div>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={setDietArrayLocally}
                                    >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </td>
                </tbody>
            </table>

        </div>
    )
}

export default table