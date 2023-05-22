import React from 'react'
import Header from './header'

function PayFees() {
  return (
    <>
    <Header />
    <div className='main-wrapper'>
    <div class="container">
    <h3 className='pt-5'>Student Fees Transaction</h3>
    <div className="containerBody">
    <form >
                                 
                                  <div  className='pt-3'>
                                      <label className="col-xl-3">Student Id </label>
                                      <input
                                        className="box col-xl-5"
                                        name="selectedClusters"
                                        // value={values.selectedClusters}
                                        // onChange={(e) => {
                                        //   this.handleInputChange(e);
                                        // }}
                                      />

                                    </div>
                                    <div className='pt-3'>
                                      <label className="col-xl-3">Student Name </label>
                                      <input
                                        className="box col-xl-5"
                                        name="selectedClusters"
                                        // value={values.selectedClusters}
                                        // onChange={(e) => {
                                        //   this.handleInputChange(e);
                                        // }}
                                      />
                                    </div>
                                    <div className='pt-3'>
                                      <label className="col-xl-3">Amount</label>
                                      <input
                                        className="box col-xl-5"
                                        name="selectedClusters"
                                        // value={values.selectedClusters}
                                        // onChange={(e) => {
                                        //   this.handleInputChange(e);
                                        // }}
                                      />
                                    </div>
                                    <div className='pt-3'>
                                      <label className="col-xl-3">Class</label>
                                      <input
                                        className="box col-xl-5"
                                        name="selectedClusters"
                                        // value={values.selectedClusters}
                                        // onChange={(e) => {
                                        //   this.handleInputChange(e);
                                        // }}
                                      />
                                    </div>
                                    <div className='pt-3'>
                                      <label className="col-xl-3">Course</label>
                                      <select
                                        className="box col-xl-5"
                                        name="selectedClusters"
                                        // value={values.selectedClusters}
                                        // onChange={(e) => {
                                        //   this.handleInputChange(e);
                                        // }}
                                      >
                                        <option value="" defaultValue>
                                         Select Course
                                        </option>
                                        {/* {this.renderClusterOptions(clustersList)} */}
                                      </select>
                                    </div>
                                    <div  className='pt-3'>
                                      <label className="col-xl-3">Payment Type </label>
                                      <select
                                        className="box col-xl-5"
                                        name="selectedClusters"
                                        // value={values.selectedClusters}
                                        // onChange={(e) => {
                                        //   this.handleInputChange(e);
                                        // }}
                                      >
                                        <option value="" defaultValue>
                                          Payment type...
                                        </option>
                                        {/* {this.renderClusterOptions(clustersList)} */}
                                      </select>
                                    </div> 
                                    <div>
                                      <button className='buttons'>Submit</button>
                                    </div>
                                </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default PayFees