# coding: utf-8
import os
from pathlib import Path
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register fonts for Vietnamese
pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold', 'C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Italic', 'C:/Windows/Fonts/ariali.ttf'))

WIDTH, HEIGHT = 11 * 72, 8.5 * 72  # Landscape Letter (792 x 612)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Background dark color
        self.setFillColor(colors.HexColor('#0F131A'))
        self.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
        
        # Top accent bar
        self.setFillColor(colors.HexColor('#5865F2'))
        self.rect(0, HEIGHT - 6, WIDTH, 6, fill=1, stroke=0)
        
        # Footer
        self.setFont('Arial', 9)
        self.setFillColor(colors.HexColor('#6E7681'))
        self.drawString(40, 22, 'Mini Hackathon AI Batch 04 · Nhóm Trustmebro (Lớp 3A · Phòng E403 · Track B1)')
        self.drawRightString(WIDTH - 40, 22, f'Trang {self._pageNumber} / {page_count}')
        self.restoreState()

def build_pdf(filename='demo-slides.pdf'):
    doc = SimpleDocTemplate(
        filename,
        pagesize=(WIDTH, HEIGHT),
        leftMargin=40,
        rightMargin=40,
        topMargin=32,
        bottomMargin=42
    )
    
    tag_style = ParagraphStyle(
        'TagStyle',
        fontName='Arial-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#5865F2'),
        spaceAfter=3
    )
    
    h1_style = ParagraphStyle(
        'H1Style',
        fontName='Arial-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#FFFFFF'),
        spaceAfter=3
    )
    
    sub_style = ParagraphStyle(
        'SubStyle',
        fontName='Arial',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#8B949E'),
        spaceAfter=12
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        fontName='Arial',
        fontSize=10,
        leading=14.5,
        textColor=colors.HexColor('#C9D1D9')
    )
    
    body_bold = ParagraphStyle(
        'BodyBold',
        fontName='Arial-Bold',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor('#FFFFFF')
    )
    
    quote_style = ParagraphStyle(
        'QuoteStyle',
        fontName='Arial-Italic',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#C9D1D9')
    )
    
    story = []

    # ==================== TRANG 1: BỐI CẢNH, BÀI TOÁN & BẰNG CHỨNG THỰC TẾ ====================
    story.append(Paragraph('TRANG 1 · TIÊU CHÍ R1: BỐI CẢNH &amp; BẰNG CHỨNG THỰC TẾ', tag_style))
    story.append(Paragraph('Bối Cảnh, Bài Toán &amp; Bằng Chứng Khảo Sát (Chuẩn A/B, N = 21)', h1_style))
    story.append(Paragraph('Đề tài Track B1: Discord Deadline &amp; Logistics Guard · Nhóm Trustmebro (Lớp 3A · Phòng E403)', sub_style))

    p1_left = [
        Paragraph('<b>Bối cảnh &amp; Nỗi đau thực tế:</b>', body_bold),
        Spacer(1, 4),
        Paragraph('• Học viên lớp AI Batch 04 giao tiếp và nhận bài tập rải rác trên hàng chục kênh Discord (#announcements, #lab-assignments, #quiz-updates...).<br/>'
                  '• Thông báo dời hạn, hủy buổi, đổi phòng nộp bài thường bị trôi dạt giữa hàng trăm tin chat.<br/>'
                  '• Khi hỏi bot AI hiện tại, học viên liên tục nhận về thông tin bịa đặt hoặc link form đã đóng.', body_style),
        Spacer(1, 8),
        Paragraph('<b>📊 Bằng chứng định lượng (Khảo sát N = 21, Chuẩn A &amp; B):</b>', body_bold),
        Spacer(1, 4),
        Paragraph('• <b>61.9% (13/21 bạn):</b> Mất từ 5 đến hơn 15 phút mỗi lần tra cứu deadline.<br/>'
                  '• <b>52.4% bạn:</b> Thất bại ở lần gần nhất hỏi bot (33.3% trả lời mơ hồ, 9.5% sai hạn/link).<br/>'
                  '• <b>71.4% bạn:</b> Chịu hậu quả tiêu cực (hoang mang, nộp sát nút, nộp muộn, nộp nhầm file).', body_style)
    ]

    p1_right = [
        Paragraph('<b>💬 Trích dẫn nguyên văn học viên (Chuẩn B):</b>', body_bold),
        Spacer(1, 5),
        Paragraph('<i>"Hỏi bot thì bot tự chế ra barem điểm không hề có trên lớp làm mình hoảng loạn... Rào cản lớn nhất là thông tin nằm rải rác mỗi nơi một mẩu và không có trang tổng hợp chuẩn xác."</i>', quote_style),
        Spacer(1, 7),
        Paragraph('<i>"Bot quăng ra một link form đã đóng từ kỳ trước... nộp sát nút chỉ còn đúng 2 phút là đóng cổng."</i>', quote_style),
        Spacer(1, 7),
        Paragraph('<i>"Công cụ tự động không hiệu quả, học viên buộc phải làm phiền lẫn nhau và làm phiền TA để check thông tin."</i>', quote_style),
        Spacer(1, 10),
        Paragraph('<b>Hành vi hiện tại:</b> 47.6% gõ search Discord nhưng bị ngợp giữa kết quả loãng; 14.3% lội kênh ghim; 14.3% hỏi bạn bè.', body_style)
    ]

    t_p1 = Table([[p1_left, p1_right]], colWidths=[360, 340])
    t_p1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#161B22')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_p1)
    story.append(PageBreak())

    # ==================== TRANG 2: LÁT CẮT GIẢI PHÁP MỘT CÂU & KIẾN TRÚC ====================
    story.append(Paragraph('TRANG 2 · TIÊU CHÍ R2 &amp; R5: LÁT CẮT &amp; KIẾN TRÚC PIPELINE', tag_style))
    story.append(Paragraph('Lát Cắt Giải Pháp Một Câu &amp; Kiến Trúc Tổng Quan', h1_style))
    story.append(Paragraph('Không phải chatbot hỏi đáp - Trở thành Kênh Tổng Hợp &amp; Lịch Biểu Có Căn Cứ', sub_style))

    p2_left = [
        Paragraph('<b>🎯 Lát Cắt MỘT CÂU (Core Scope):</b>', body_bold),
        Spacer(1, 4),
        Paragraph('<i>"Nhiều kênh thông báo rải rác → Một quyết định AI có căn cứ từ nguồn chính thức → Một lịch deadline chung dễ theo dõi tại #deadline-hub."</i>', ParagraphStyle('P2Box', fontName='Arial-Bold', fontSize=10.5, leading=15, textColor=colors.HexColor('#58A6FF'))),
        Spacer(1, 10),
        Paragraph('<b>Mức tự động hóa theo cost-of-error:</b><br/>'
                  'Chọn <b>Augment + Conditional</b> vì rủi ro sai sót rất cao (sai deadline cả lớp bị 0 điểm). Chỉ tự công bố khi đủ căn cứ chính thức; tin mơ hồ dừng lại cho TA duyệt.', body_style),
        Spacer(1, 8),
        Paragraph('<b>3 Non-goals nghiêm ngặt:</b><br/>'
                  '1. KHÔNG tự bịa deadline từ tin đồn học viên hoặc tin nhắn thiếu mốc giờ.<br/>'
                  '2. KHÔNG can thiệp sửa đổi thông báo gốc hoặc quyền nộp bài của sinh viên.<br/>'
                  '3. KHÔNG tự động spam tin nhắn riêng (DM) làm phiền học viên.', body_style)
    ]

    p2_right = [
        Paragraph('<b>🛡️ Kiến Trúc Pipeline 5 Chốt Chặn Bảo Vệ:</b>', body_bold),
        Spacer(1, 4),
        Paragraph('<b>1. Authority Whitelist Gate:</b> Chỉ cho phép tin từ Giảng viên/TA/BTC. Tin nhắn sinh viên đùa giỡn, tung tin đồn bị loại bỏ ngay từ đầu (tiết kiệm 100% token AI).', body_style),
        Spacer(1, 4),
        Paragraph('<b>2. Gemini 3.6 Flash Extractor:</b> Trích xuất có cấu trúc JSON (loại sự kiện, ngày giờ, độ khẩn cấp, đối tượng lớp).', body_style),
        Spacer(1, 4),
        Paragraph('<b>3. Zero-Hallucination Regex Guard:</b> Nghiêm cấm tự bịa giờ 20:00/23:59 nếu tin gốc không có con số chỉ giờ cụ thể. Ép null an toàn.', body_style),
        Spacer(1, 4),
        Paragraph('<b>4. Structured Validator &amp; Conflict Resolver:</b> Nhận diện thông báo gia hạn để ghi đè bản cũ, phát hiện xung đột mốc giờ nâng cảnh báo P0.', body_style),
        Spacer(1, 4),
        Paragraph('<b>5. Quota Resilience Fallback Engine:</b> Tự động bắt mã lỗi 429 Quota Exceeded của Gemini Free Tier, chuyển sang Fallback Engine bảo vệ 100% uptime.', body_style)
    ]

    t_p2 = Table([[p2_left, p2_right]], colWidths=[330, 370])
    t_p2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#161B22')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_p2)
    story.append(PageBreak())

    # ==================== TRANG 3: 4 LỚP CHỖ KHÓ & TRẢI NGHIỆM NGƯỜI DÙNG ====================
    story.append(Paragraph('TRANG 3 · TIÊU CHÍ R3: 4 LỚP CHỖ KHÓ &amp; TRẢI NGHIỆM HAX/PAIR', tag_style))
    story.append(Paragraph('4 Lớp Chỗ Khó &amp; Cách Thức Giải Quyết Trong Trải Nghiệm', h1_style))
    story.append(Paragraph('Tích hợp trực quan các nguyên tắc Microsoft HAX G1/G2/G9/G10/G11 &amp; Google PAIR', sub_style))

    d1 = [
        Paragraph('<b>1. Bẫy căn cứ &amp; Số nhiễu (HAX G1/G2):</b>', ParagraphStyle('D1', fontName='Arial-Bold', fontSize=10.5, textColor=colors.HexColor('#58A6FF'))),
        Spacer(1, 3),
        Paragraph('• <i>Chỗ khó:</i> Tin nhắn chứa số điện thoại, số phòng 302, link URL có số dễ làm AI nhầm thành giờ nộp.<br/>'
                  '• <i>Giải pháp:</i> Regex phân tích ngữ cảnh cửa sổ 30 ký tự, lọc sạch số phòng/SĐT. Tin nhắn sinh viên bị chặn ngay tại Authority Gate.', body_style)
    ]
    d2 = [
        Paragraph('<b>2. Mơ hồ &amp; Không đoán mò (HAX G10: Scope in doubt):</b>', ParagraphStyle('D2', fontName='Arial-Bold', fontSize=10.5, textColor=colors.HexColor('#D29922'))),
        Spacer(1, 3),
        Paragraph('• <i>Chỗ khó:</i> Tin nhắn chỉ báo "Nộp bài trước thứ Sáu" hoặc "Cô sẽ chốt giờ trong tin tiếp theo".<br/>'
                  '• <i>Giải pháp:</i> Zero-Hallucination Guard ép mốc giờ về null, không đoán mò 20:00/23:59. Đưa vào hàng chờ duyệt để TA bổ sung bằng modal.', body_style)
    ]
    d3 = [
        Paragraph('<b>3. Cập nhật đè &amp; Đối chiếu nguồn (HAX G11: Explain why):</b>', ParagraphStyle('D3', fontName='Arial-Bold', fontSize=10.5, textColor=colors.HexColor('#3FB950'))),
        Spacer(1, 3),
        Paragraph('• <i>Chỗ khó:</i> Thầy gia hạn mốc mới, tin cũ trôi dạt làm học viên hoang mang không biết theo mốc nào.<br/>'
                  '• <i>Giải pháp:</i> Validator tự động supersede bản cũ. Bấm vào deadline → Tự động smooth-scroll nhảy đến đúng tin nhắn của thầy và highlight tím.', body_style)
    ]
    d4 = [
        Paragraph('<b>4. Phát hiện sai lệch &amp; Phản hồi (HAX G9: Efficient correction):</b>', ParagraphStyle('D4', fontName='Arial-Bold', fontSize=10.5, textColor=colors.HexColor('#A371F7'))),
        Spacer(1, 3),
        Paragraph('• <i>Chỗ khó:</i> Form nộp bài đóng sớm hơn mốc giờ hoặc link bị lỗi, học viên cuống cuồng spam TA.<br/>'
                  '• <i>Giải pháp:</i> Nút "Báo sai" 1 chạm ngay trên deadline. Thẻ đổi sang "Đang xác minh", cả lớp cùng biết tình trạng, tránh báo trùng.', body_style)
    ]

    t_p3 = Table([[d1, d2], [d3, d4]], colWidths=[350, 350])
    t_p3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#161B22')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_p3)
    story.append(PageBreak())

    # ==================== TRANG 4: BẢNG ĐO LƯỜNG ĐỐI CHIẾU QUALITY BAR ====================
    story.append(Paragraph('TRANG 4 · TIÊU CHÍ R4: ĐO KIỂM GOLDEN SET &amp; QUALITY BAR', tag_style))
    story.append(Paragraph('Bảng Đo Lường Thực Tế Đối Chiếu Quality Bar Khóa Tại CP4', h1_style))
    story.append(Paragraph('Chính thức vượt qua Quality Bar trên bộ đề 35 test cases phức tạp', sub_style))

    eval_table_data = [
        [
            Paragraph('<b>Chỉ số đo lường</b>', body_bold),
            Paragraph('<b>Quality Bar (Khóa CP4)</b>', body_bold),
            Paragraph('<b>Kết quả Đo Thật CP5</b>', body_bold),
            Paragraph('<b>Đánh giá</b>', body_bold)
        ],
        [
            Paragraph('Tổng số ca kiểm thử', body_style),
            Paragraph('35 ca (phủ 6 nhóm khó)', body_style),
            Paragraph('<b>35 ca</b>', body_bold),
            Paragraph('<font color="#3FB950"><b>Đủ bộ đề</b></font>', body_style)
        ],
        [
            Paragraph('Số ca vượt qua (PASS)', body_style),
            Paragraph('≥ 30 ca', body_style),
            Paragraph('<b>31 ca</b>', ParagraphStyle('PPass', fontName='Arial-Bold', textColor=colors.HexColor('#3FB950'))),
            Paragraph('<font color="#3FB950"><b>VƯỢT BAR (+1 ca)</b></font>', body_style)
        ],
        [
            Paragraph('Tỉ lệ đạt (Pass Rate)', body_style),
            Paragraph('≥ 85.0%', body_style),
            Paragraph('<b>88.57%</b>', ParagraphStyle('PRate', fontName='Arial-Bold', textColor=colors.HexColor('#3FB950'))),
            Paragraph('<font color="#3FB950"><b>ĐẠT (+3.57%)</b></font>', body_style)
        ],
        [
            Paragraph('Ca bịa / sai deadline', body_style),
            Paragraph('0 ca (bắt buộc 0.0%)', body_style),
            Paragraph('<b>0 ca (0.00%)</b>', ParagraphStyle('PZero', fontName='Arial-Bold', textColor=colors.HexColor('#3FB950'))),
            Paragraph('<font color="#3FB950"><b>ZERO HALLUCINATION</b></font>', body_style)
        ],
        [
            Paragraph('<b>KẾT LUẬN CHUNG</b>', body_bold),
            Paragraph('—', body_style),
            Paragraph('<b>ĐÃ ĐẠT QUALITY BAR</b>', ParagraphStyle('PVer', fontName='Arial-Bold', textColor=colors.HexColor('#3FB950'))),
            Paragraph('<font color="#3FB950"><b>CHÍNH THỨC ĐẠT</b></font>', body_style)
        ]
    ]
    t_eval = Table(eval_table_data, colWidths=[200, 170, 160, 170])
    t_eval.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#21262D')),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#161B22')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#30363D')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_eval)
    story.append(Spacer(1, 12))
    
    breakdown_text = Paragraph(
        '<b>Độ chính xác theo 6 nhóm thử thách khắc nghiệt:</b><br/>'
        '• Mơ hồ &amp; Quy đổi thời gian: <b>6/6 (100%)</b> &nbsp;|&nbsp; '
        '• Ngoài thẩm quyền &amp; Lọc nhiễu: <b>5/5 (100%)</b> &nbsp;|&nbsp; '
        '• Adversarial Zero-Hallucination: <b>7/7 (100%)</b><br/>'
        '• Bẫy căn cứ &amp; Số nhiễu: <b>5/6 (83.3%)</b> &nbsp;|&nbsp; '
        '• Cập nhật đè &amp; Chuỗi tin nhắn: <b>4/5 (80%)</b> &nbsp;|&nbsp; '
        '• Đặc thù miền 3A/3B: <b>4/6 (66.7%)</b><br/>'
        '🔒 <b>Liêm chính học thuật:</b> Khóa mã băm SHA-256 (<code>90ccac7e3095...</code>), không sửa đề. 21/21 Unit Tests backend đạt 100% PASS.',
        body_style
    )
    story.append(breakdown_text)
    story.append(PageBreak())

    # ==================== TRANG 5: BÀI HỌC THẤT BẠI & PHẢN HỒI NGƯỜI DÙNG (R6) ====================
    story.append(Paragraph('TRANG 5 · TIÊU CHÍ R6: BÀI HỌC THẤT BẠI &amp; MOM TEST LOG', tag_style))
    story.append(Paragraph('Bài Học Thất Bại &amp; Dữ Liệu Phản Hồi Người Dùng (R6)', h1_style))
    story.append(Paragraph('5 phiên thử nghiệm thực tế với học viên ngoài nhóm dẫn tới thay đổi trực tiếp trên sản phẩm', sub_style))

    p5_left = [
        Paragraph('<b>Bài học từ thất bại Stress Test CP4:</b>', body_bold),
        Spacer(1, 3),
        Paragraph('• Đợt CP4 chỉ đạt 17.14% (5 ca bịa mốc giờ) do prompt dài dòng không trị được bẫy đối nghịch.<br/>'
                  '• Nhóm công khai kết quả thất bại, xây dựng Fallback Regex Engine và chốt chặn Zero-Hallucination Regex Guard giúp tăng vọt lên 88.57% PASS ở CP5.', body_style),
        Spacer(1, 6),
        Paragraph('<b>💬 Phản hồi thực tế từ 5 bạn ngoài nhóm (Mom Test):</b>', body_bold),
        Spacer(1, 3),
        Paragraph('• <b>Đức Minh (U1 · 3A):</b> <i>"Nút mũi tên góc này bé tí mày ơi, tao bấm trượt cụ nó một phát, tưởng icon trang trí."</i><br/>'
                  '• <b>Văn An (U2 · 3A):</b> <i>"Ủa con bot này không chat được à? Gom một chỗ thế này nhìn tiện vãi, đỡ phải gõ lệnh."</i><br/>'
                  '• <b>Lê Thảo (U3 · 3A):</b> <i>"Ơ đổi màu cam nhìn giật cả mình tưởng toang! Thêm ghi chú đã gia hạn cho đỡ lú nhé."</i><br/>'
                  '• <b>Hoàng Nam (U4 · 3B):</b> <i>"Server 3A sao có bài 3B bọn tôi, lỡ nhìn nhầm thì ăn cám. Cần có nút lọc lớp."</i><br/>'
                  '• <b>Minh Tuấn (U5 · 3A):</b> <i>"Ngon mày ơi! Có nút Báo sai này đỡ hẳn quả inbox spam TA mỗi khi form lỗi."</i>', quote_style)
    ]

    p5_right = [
        Paragraph('<b>🔄 Cải Tiến Thực Tế Đã Đưa Vào §9 Changelog (v5.0):</b>', body_bold),
        Spacer(1, 4),
        Paragraph('<b>1. Sửa nút Chi tiết (Khắc phục B1 từ Minh):</b> Tăng kích thước nút lên 36px, thêm tooltip chỉ dẫn mở nguồn gốc.<br/>'
                  '<b>2. Thêm Banner hướng dẫn tân binh (Khắc phục B2 từ An):</b> Ghim cố định ở đầu kênh #deadline-hub giải thích cơ chế tự động.<br/>'
                  '<b>3. Hiển thị lịch sử gia hạn (Khắc phục B3 từ Thảo):</b> Trong modal hiện rõ dòng "Đã gia hạn từ mốc cũ..." giúp an tâm.<br/>'
                  '<b>4. Lập luận giữ nguyên tag vàng [Lớp 3B] (Phản hồi B4 từ Nam):</b> Giữ thiết kế tối giản, đưa bộ lọc tab vào roadmap.<br/>'
                  '<b>5. Lập luận giữ nguyên luồng Báo sai HAX G9 (Phản hồi B5 từ Tuấn):</b> Trạng thái "Đang xác minh" đã giải quyết tốt nhu cầu học viên.', body_style),
        Spacer(1, 6),
        Paragraph('<b>6. Nút Reset Demo 1-Click:</b> Tích hợp trên topbar phục vụ Ban giám khảo kiểm thử trực tiếp.', body_style)
    ]

    t_p5 = Table([[p5_left, p5_right]], colWidths=[360, 340])
    t_p5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#161B22')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_p5)
    story.append(PageBreak())

    # ==================== TRANG 6: KẾ HOẠCH MỞ RỘNG & ĐÓNG GÓP THÀNH VIÊN ====================
    story.append(Paragraph('TRANG 6 · BÀN GIAO CP6: KẾ HOẠCH MỞ RỘNG &amp; ĐÓNG GÓP THÀNH VIÊN', tag_style))
    story.append(Paragraph('Kế Hoạch Mở Rộng Sản Phẩm &amp; Đóng Góp Thành Viên', h1_style))
    story.append(Paragraph('Sẵn sàng bàn giao sản phẩm hoàn chỉnh và bảo vệ trước Ban giám khảo tại Checkpoint 6', sub_style))

    p6_left = [
        Paragraph('<b>🚀 Kế Hoạch Mở Rộng Sản Phẩm (Post-Hackathon):</b>', body_bold),
        Spacer(1, 4),
        Paragraph('<b>1. Kết nối Discord Gateway Thật:</b> Chuyển từ Web Client mock sang bot Discord chạy trực tiếp trên server lớp qua thư viện <code>discord.py</code>.<br/>'
                  '<b>2. Đồng bộ 2 Chiều Google Calendar / Outlook:</b> Tự động xuất file .ics hoặc đồng bộ vào email sinh viên trường VinUni.<br/>'
                  '<b>3. Kênh Webhook Riêng Cho TA (#ta-alerts):</b> Bắn thông báo đẩy riêng cho Trợ giảng khi có học viên gửi phiếu Báo sai sát giờ.<br/>'
                  '<b>4. Bộ Lọc Tab Phân Biệt Lớp Học (Class Filter):</b> Cho phép chuyển nhanh xem bài riêng của Lớp 3A hoặc Lớp 3B.', body_style),
        Spacer(1, 8),
        Paragraph('<font color="#3FB950"><b>🎯 Trạng Thái Bàn Giao CP5:</b></font><br/>'
                  '• 21/21 Unit Tests Backend: <b>100% PASS</b><br/>'
                  '• Golden Set Đo Thật: <b>31/35 PASS (88.57%), 0% Bịa</b><br/>'
                  '• Đầy đủ Video Demo dự phòng, Slide 6 trang PDF, 4 Bài suy ngẫm.', body_style)
    ]

    p6_right = [
        Paragraph('<b>👥 Đóng Góp Của Từng Thành Viên Nhóm Trustmebro:</b>', body_bold),
        Spacer(1, 4),
        Paragraph('<b>• Lưu Xuân Dũng (Lead · 2A202602746):</b><br/>'
                  '&nbsp;&nbsp;Kiến trúc AI, Prompt Gemini 3.6 Flash, Authority Gate, Zero-Hallucination Guard, Fallback Engine, Lead Q&amp;A.', body_style),
        Spacer(1, 3),
        Paragraph('<b>• Trương Thị Lan Anh (2A202602451):</b><br/>'
                  '&nbsp;&nbsp;Xây dựng Discord Web Client, hiện thực hóa 4 luồng HAX/PAIR, hiệu ứng smooth-scroll highlight, thiết kế slide.', body_style),
        Spacer(1, 3),
        Paragraph('<b>• Nguyễn Duy Khánh (2A202602736):</b><br/>'
                  '&nbsp;&nbsp;Product Manager, Khảo sát N=21, điều phối 5 phiên Mom Test với người dùng ngoài nhóm, tài liệu spec &amp; Changelog.', body_style),
        Spacer(1, 3),
        Paragraph('<b>• Tạ Quang Dũng (2A202602588):</b><br/>'
                  '&nbsp;&nbsp;Data &amp; QA Lead, biên soạn Golden Set 35 cases, thiết lập mã băm SHA-256, script run_eval.py tự động.', body_style)
    ]

    t_p6 = Table([[p6_left, p6_right]], colWidths=[340, 360])
    t_p6.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#161B22')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('INNERGRID', (0,0), (-1,-1), 1, colors.HexColor('#30363D')),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_p6)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f'Successfully built {filename}')

if __name__ == '__main__':
    build_pdf('demo-slides.pdf')
