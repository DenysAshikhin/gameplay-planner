"use client"

import ReactGA from "react-ga4";
ReactGA.initialize([{
    trackingId: "G-GGLPK02VH8",
}]);

import Image from 'next/image';
import Link from 'next/link';




export default function Expeditions() {



    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                backgroundColor: 'black',
                position: 'relative',
            }}
        >
            <div style={{
                display: 'flex',
                flex: '1',
                // alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255, 0.05)',
                paddingLeft: '12px'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'start',
                    width: '550px',
                    // maxHeight: 'calc(100% - 49px)',
                    margin: '12px 36px 12px 0px', padding: '12px', borderRadius: '12px'
                }}>
                    <div
                        className='importantText'
                        style={{ fontSize: '36px', marginTop: '-6px', marginBottom: '6px' }}
                    >
                        Thank you for supporting the Gameplay Planner
                    </div >
                    <div
                        className='importantText'
                        style={{ fontSize: '24px', marginTop: '24px', marginBottom: '6px' }}
                    >
                        Feel free to press the icon below to be redirected to the donation payment
                    </div >


                    <div style={{ margin: '24px auto' }}>
                        <Link href={`https://donate.stripe.com/dR69E9fU64KDcc87ss`} style={{ textDecoration: 'none' }}>
                            <div
                                className={`hover`}
                                style={{
                                    height: "148px",
                                    width: "150px",
                                    marginRight: "48px",
                                    borderRadius: "6px",
                                }}
                            >
                                <div className={``}
                                    style={{
                                        height: "80%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(255,255,255, 0.05)",
                                        borderTopRightRadius: "12px",
                                        borderTopLeftRadius: "12px",
                                        padding: "6px 6px 6px 6px",
                                        borderTop: "2px solid rgba(255,255,255,0.8)",
                                        borderLeft: "2px solid rgba(255,255,255,0.8)",
                                        borderRight: "2px solid rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "calc(100% - 12px)",
                                            width: "calc(100% - 12px)",
                                        }}
                                    >
                                        <Image
                                            alt={`navigation item, picture of a donation jar`}
                                            src={`/images/icons/donation-cropped.svg`}
                                            fill
                                            priority
                                        />
                                    </div>
                                </div>

                                <div className={``}
                                    style={{
                                        height: "20%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(255,255,255, 0.12)",
                                        borderBottomRightRadius: "12px",
                                        borderBottomLeftRadius: "12px",
                                        borderBottom: "2px solid rgba(255,255,255,0.8)",
                                        borderLeft: "2px solid rgba(255,255,255,0.8)",
                                        borderRight: "2px solid rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        className="importantText"
                                        style={{
                                            // marginTop: '6px',
                                            fontSize: "20px",
                                        }}
                                    >
                                        {`Donations`}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>



                </div>
            </div>
        </div >
    );
}