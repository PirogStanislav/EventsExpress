﻿import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderTextField } from '../helpers/helpers';

import Button from "@material-ui/core/Button";

export class EventForm extends Component {

    render() {

        return (
            <form onSubmit={ this.props.handleSubmit } encType="multipart/form-data">

                <div className="blog-entry d-md-flex fadeInUp">
                    <a href="/#" className="img img-2" style={{backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAgQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAIHAf/EADMQAAIBAwMDAgMHBAMBAAAAAAECAwAEEQUSITFBURMiFGFxBjJCgZGh0SNSscHh8PEV/8QAGgEAAQUBAAAAAAAAAAAAAAAABQECAwQGAP/EACoRAAICAgIBAwIGAwAAAAAAAAABAgMEERIhMQUTQUJRIjOhwdHwFCMy/9oADAMBAAIRAxEAPwDi4Ga3GBXgqQICOetN2O0ahsninmmMsEe6WUJnoB1pMIguW3Lx2o31hOiKqqrjAyByafCXF7GtFqgvg6okTbl65r3cZ51jUME65x/ikmmxXaqfTCrHnkk+OtOLS7KRIBNGJskDAzxR/FSvpakina3GfTJbe2/rmOddq7cH+abSWMPw6vBwFB4/uoKx1BRb7r1F9UnblvHmmMd5B7lt1xMi5x0BqpdgyhF6L2LKNkkn5Z7ptm6wFHCgZ6EeaC1mFLaFhFGrSNwpX8NWK3hQRIzk+o4AA61rDLCZWX08t2bzQG+EqbO/DNLVjQux+MXto5rKd0vpsmH7Y70PNEmNuXVhz9010PV9Hjv4nWJI0nxlZP5qn6vpNxp0URkkWQnPuUccdjT4Wxl0Bb8OyvctbS+QOELLF98Lt454qF2XPHjvQzXWGPqLjnGSOKx5ww2FcMPxVKUmSXKFozgEZ+VLJIyhw1M1dDFmR8D5+aEl/qn+7vXCAu0VlEbfpWVxwGDzUoPFQoCTUgBpo8w9KkhcL2585rVIzJIkakAuwUE9Bk4q2W/2HuJW9t/b7O77Tx+VdySJK6LLf+FsW2F+0kfwqoRgEg5pl8MYZmZ4w4IyFzx8ycVY9L+x1lbDcrPIzx7S+7z1IFaXP2Wvmc/A3LSBWztIx+/0otg5+lwm/HgbkelWr8WirpdLd3saF1tvTG7c2WUAdsVaLKxVJlkt/XkWZcjdGcEZ5IP81l79lLyO3ZfhVdwoyY2G5/PWt7DVbie7ksba6k/pcZkOQcUWjZG6Oii6rMaSkn2hlctfoIvhQ6LuALBD9355oOIzSy+vCNkUZOWc4B5zj61HPb6r6iv8fbiEE5dZSdv1o2xvzdyxesAzLkFBzkgkGqfqHp6vjF76W/AS9J9VeNOace5a/v6geq6sLO1LJzLIMqvmqZq2oXl7gTnYinOFOMVftZs4L2ZWdSpGQABjFUTV7WCGdo5AfafNZmFai9PyE/UrLvPiD+P5El1c+oCACWPBJ/1Q3qSD8RGKJlEKg7Cc+TQrL15qcCGxmd1weR9KxSyjKn61EMivdx5Ga4Qk9RvIrKirK44njFTld0e9OCOtWX7KaXaGBp9QgVw7YUydAB/J/wAU8utP0aJDElnCocZOz2n8jVadyjLQUo9Nttgpr5OatnPOaNtdVv7Z43juJCExhWYkH5Gptatre2v9luJDHtBw5zz4zQicMqvCcnGMDr4qdPa2U5KdM3Hemjrdnfo6qRvLOuFUHAX5mmraqq26wRTL8QRtU49oPbNUPRrt10pPVQ71JAz1OOgpjby2lraH4iAvfnknf93wPlS42ve01tGjvl7mMpp6Y6vr64t7AySs7XIGH9Pn9O9VDUfStpMiUCaYCUsDjBHQHzjP71bLO/lNis9xcsBn7ka4J+uf0/KlWr6pokxRrm2WdhnBY8n9OtajEjLXS2ZTNknLbK+s8PrYkJkjdsNk/uD5qy6e0+5TaHMQx7wyjf8Alnml9vDoyRCWSxQLK2SrltwXtjnj6UPNJHcSPHCVheJiIxHwCoPTFEe7FpoEv/U9plmunnuUf2ASgZMZ4Zv5rn2p+pNdMX7np4qwnU0FkFcyNK7KCzdV+nj/AJqHWVg+IWYIMzru2r2PSgPqOCq17kS9Vn2XRVcn0ipy2hbOwHj5UHPAyDODirDJJBCMyIVOO1RLJbSw+4btoznvmhLRLyK5tI68V59081JISWJPmo8Zpg8zNZWbDWVxx0lTbNZiCKRYzGejUDLcW0UZV5Hmcd14ApJLMJLjJ3KvAP0qw28tpb2SSbRge7nzmqXBI1dOR9MekiRdJsb2zBvoSrvwHU4cDt/01E+n2S30e5ZWKkMlwzZ9q/hAFbXU/wAXC8sPsYDIIOQ3yrLSa4tYkaS2PC+5iucmpVHSH8KbJ7cRjJq82nyoi2wSNxuCvgk57mk2oTA3SmzkSdpyzNjovP8AgVPLq9jcI7zwLNKTxwc/+Us1K3ikiXUtHUwmL2zon3ee+O3zqzXuvTK2XJSjqIbqWvm6b+iAk4XYQfu8UglWYssrtkk+7Axj6VJbmKaPE+Q39wHWpQh9DbuyozgnrijmJlOf4TNZVP1BEd0zoA+SUG3nuO1R38sVs6P6hQkBlHU/MChrcSeoC4PpjueDUV0JNRulOwqie1eO1FZ3OMFx8glx5Wbl4H2jltWuljwsaEj3ydT8z/FOtU0cidNgOIwB9aQaDE8Fy3p8KO7ea6dNbK9om8ZbaKF57smlyfQilTD8vz+xzjW9PzFlR27VWI7bEpLcL3rpGqwKp2Lz5Hiqle2bJJIQuNx4oVKsmrv60V+eBQ5z2oWSMDnPFM7uOWIekBuHkjP70L8OzjAX51E4lmFi12wLaK9ov4Q+RXlJxf2H+7EZhs3JZimCemegom+D20RjxuRuh8Zp/H9gpp54PibqD0SQZtpO4juAMflmvPttPpUF49rbQziZFAOEAjJx25znHypHjtLb6C0MyMpcUV65uHWCK2gOE4A5phFqAtoFhldmBU5x1Oaqsty4KgsRtPUDBprZRF4y0soJPYjtSpRZNXkS29Gr2ryAtZFkQnG1z7h86J09LuOOazaX0xJw2ec0bDJFCTI3ToARW9wbaaRGKklgQw/3TlASX3F6adImwIQC3IweD+dECC4UhEIx+LHUfStzBJFN7TvC8ADjbRNqsrOM9+9XsevT6B98lrwBPA7yrGeoPO44NO7DRmlOEKhO9RxW4lck9j1p7pavG/IznvRRbitoz2Tat6GGj6bDaKTsVmY85HQU7PvjPmoLaMFRxRaDBxVG2Tk9sr1voQXWmEyb/JpZeaW0kgUJ7c/pV0eHdQ72oHNQjZNoo139nvVQIOMd6UXehuiYCkAdxXTDCngUHdwIF5Ax9KTS34G+7NfJy7/5Fx4P6VldF9CP+39q8pOCHf5MwW01MPgFgOaqf2pvI9TlDLFtK5UuRgv4qaEnyaEvQPVPFJYuUdGix0oybEHw6xunqoWDHnFezw3ERQIzFCOPlTvaCw4H6VLgccCqjhoILtCSK0upsGQs+OmT0p3ZWq2cLTXWXY/t8hR0KgY4FS3X3Uqamnk+2SOaqjvQujd5C7DqRkjxRtpnlyMYHAocAAvgYphbgbRx2otTWooC5mQ9hul4JO5eventsEUjAApPa/7ppb9qfNGcybW5Dq3ZeBRSqM0sg7UchPnvVOaOhY2goYrWRQRWR/eNevUJI3sEePGTQNzyKOnPFL7npSoil0gTcPFZUFeU8i5H/9k=')"}}></a>
                    <div className="text text-2 pl-md-4">
                        <Field name='title' component={renderTextField} type="input" label="Title" />
                            <div className="meta-wrap">
                                <p className="meta">    
                                <span><i className="fa fa-calendar mr-2"></i>
                        <Field name='date_from' component="input" type="date" label="" /></span>
                                <span><a href="single.html"><i className="fa fa-folder mr-2"></i>Travel</a></span>
                                <span><i className="fa fa-comment mr-2"></i>2 Comment</span>
                                </p>
                            </div>
                            
                        <Field name='description' component={renderTextField} type="input" label="Description" />
                            <p><a href="#" className="btn-custom">Read More <span className="ion-ios-arrow-forward"></span></a></p>
                    </div>
                </div>
                <Button fullWidth={true} type="submit" value="Login" color="primary">
                   Save
                </Button>
            </form>
        );
    }

}

EventForm = reduxForm({
    form: 'event-form'
})(EventForm);

export default EventForm;
