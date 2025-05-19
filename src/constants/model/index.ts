export const INTERVIEW_INVITATION_EMAIL = `
Gửi bạn thân mến, 
<br/><br/>
Qua hồ sơ ứng tuyển của bạn với vị trí <span style="font-weight: 600">{{position}}</span> chúng tôi nhận thấy bạn có những tiềm năng rất phù hợp với vị trí này. Hy vọng có thể trao đổi thêm với bạn trong một cuộc phỏng vấn trực tiếp. Đây là một bước cần thiết trong quá trình tuyển dụng để chúng tôi có thể hiểu hơn về bạn cũng như được chia sẻ với bạn nhiều hơn về câu chuyện của chúng tôi.
<br/><br/>
Sau đây là cách thức tham gia vào buổi phỏng vấn:
<br/><br/>
<span style="font-weight: 600">Thời gian</span>: {{interview_time}}, {{interview_date}}
<br/><br/>
<span style="font-weight: 600">Địa điểm</span>: {{work_location}}
<br/><br/>
<span style="font-weight: 600">Lưu ý</span>:  Ứng viên xác nhận tham gia phỏng vấn trước {{confirmation_before_time}} ngày {{confirmation_before_date}}. 
<br/><br/>
(Khi đến ứng viên liên hệ Admin - Ms Quỳnh - 0917.240.819 để được hướng dẫn)
<br/><br/>
Mọi  thắc mắc ứng viên phản hồi trong Email hoặc liên hệ qua 0917.240.819 (Ms Quỳnh)
<br/><br/>
Trân trọng!
<br/><br/>
-------------
<table>
    <tbody style="color: #000">
        <tr>
            <td>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    Ms. Quỳnh
                </p>
                <p style="font-size: 20px; font-weight: 600; margin: 4px 0px 4px 0px">
                    BỘ PHẬN NHÂN SỰ
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    Lutech.ltd
                </p>
            </td>
            <td style="border-right: solid 1px #000">
                <span style="display: block; width: 20px"></span>
            </td>
            <td>
                <span style="display: block; width: 20px"></span>
            </td>
            <td>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span>
                    0917.240.819
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span> admin@lutech.ltd
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span> Tầng 4, Tòa nhà Hanvico, 217-219 Lê
                    Duẩn, Thanh Khê, Đà Nẵng
                </p>
            </td>
        </tr>
    </tbody>
</table>`;

export const THANKS_EMAIL = `
Gửi bạn thân mến,
<br/><br/>
Đầu tiên, <strong>LUTECH.LTD</strong> xin gửi lời cảm ơn đến bạn vì đã quan tâm đến đợt tuyển dụng của chúng tôi.
<br/><br/>
Chúng tôi đánh giá cao khả năng và thái độ chuyên nghiệp của bạn. Tuy nhiên ở thời điểm hiện tại, bạn chưa thật sự phù hợp với các định hướng của công ty. Rất tiếc là chúng ta chưa có cơ hội hợp tác với nhau trong đợt tuyển dụng lần này.
<br/><br/>
Chúng tôi sẽ lưu trữ hồ sơ của bạn vào hệ thống và liên lạc nếu có vị trí phù hợp trong tương lai. Hy vọng có thể đồng hành cùng bạn trong những chặng đường khác.
<br/><br/>
Trân trọng!
<br/><br/>
-------------
<table>
    <tbody style="color: #000">
        <tr>
            <td>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    Ms. Quỳnh
                </p>
                <p style="font-size: 20px; font-weight: 600; margin: 4px 0px 4px 0px">
                    BỘ PHẬN NHÂN SỰ
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    Lutech.ltd
                </p>
            </td>
            <td style="border-right: solid 1px #000">
                <span style="display: block; width: 20px"></span>
            </td>
            <td>
                <span style="display: block; width: 20px"></span>
            </td>
            <td>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span>
                    0917.240.819
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span> admin@lutech.ltd
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span> Tầng 4, Tòa nhà Hanvico, 217-219 Lê
                    Duẩn, Thanh Khê, Đà Nẵng
                </p>
            </td>
        </tr>
    </tbody>
</table>`;

export const INVITATION_EMAIL = `
Thân gửi {{recipient}},
<br/><br/>
Phòng Nhân sự Công Ty TNHH Công Nghệ Phần Mềm Lutech trân trọng thông báo. Sau quá trình xem xét công ty mong muốn tuyển dụng bạn tại vị trí <strong>{{position}}</strong>. Bạn sẽ:
<br/><br/>
<ol>
<li>Làm việc tại: {{work_location}}</li>
<li>Chức danh: <strong>{{title}}</strong></li>
<li>Ngày bắt đầu: <strong>{{start_time}}-{{start_date}}</strong></li>
<li>Mức lương chính thức: <strong>{{salary}}</strong> </li>
<li>Thời gian làm việc: Thứ 2 - Thứ 6 (8:30 - 18:00)</li>
</ol>
<br/><br/>
<strong>GIAI ĐOẠN: THỬ VIỆC</strong>
<br/><br/>
<ol>
<li>Thời gian: <strong>2 tháng</strong> </li>
<li>Thử việc: <strong>85% Mức lương chính thức</strong> </li>
<li>Chế độ khác: Xét tăng lương ít nhất 2 lần mỗi năm, thưởng dự án, lương tháng 13, bảo hiểm y tế và xã hội đầy đủ.</li>
</ol>
<br/><br/>
Sau thời gian thử việc bạn sẽ được xem xét và trở thành nhân viên chính thức của Lutech. Nếu đồng ý với mức offer bạn vui lòng phản hồi thông tin cho chúng tôi được biết. 
<br/><br/>
Mọi thắc mắc xin vui lòng liên hệ BPNS: <strong>0917 240 819 (Ms.Quỳnh)</strong>
<br/><br/>
<i>(Offer Letter được đính kèm theo file bên dưới)</i>
<br/><br/>
Trân trọng!
<br/><br/>
-------------
<table>
    <tbody style="color: #000">
        <tr>
            <td>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    Ms. Quỳnh
                </p>
                <p style="font-size: 20px; font-weight: 600; margin: 4px 0px 4px 0px">
                    BỘ PHẬN NHÂN SỰ
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    Lutech.ltd
                </p>
            </td>
            <td style="border-right: solid 1px #000">
                <span style="display: block; width: 20px"></span>
            </td>
            <td>
                <span style="display: block; width: 20px"></span>
            </td>
            <td>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span>
                    0917.240.819
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span> admin@lutech.ltd
                </p>
                <p style="font-size: 14px; font-weight: 400; margin: 4px 0px 4px 0px">
                    <span><img src="" alt="" /></span> Tầng 4, Tòa nhà Hanvico, 217-219 Lê
                    Duẩn, Thanh Khê, Đà Nẵng
                </p>
            </td>
        </tr>
    </tbody>
</table>`;
