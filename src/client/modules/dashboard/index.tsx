'use client';

import { Typography, Box, Card, CardContent, Stack, LinearProgress, Divider, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function DashBoard() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h5' sx={{ fontWeight: 500, color: '#333' }}>
          หน้าหลัก
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, backgroundColor: '#FFEDCC', p: 1, borderRadius: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' color='textSecondary'>
              จำนวนพื้นที่ที่ใช้ไป
            </Typography>
            <Typography variant='body2' color='#FF6600' sx={{ textAlign: 'right' }}>
              90/วัน
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* เงินยืม Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2, fontWeight: 500, color: '#333' }}>
          เงินยืม
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {/* Card 1 */}
          <Card sx={{ flex: 1, bgcolor: '#fff', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='body2' color='textSecondary'>
                  เงินยืมเพื่อการศึกษาบุตร
                </Typography>
                <Box sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', p: 0.5, borderRadius: '50%' }}>
                  <HomeIcon color='success' fontSize='small' />
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant='caption' color='textSecondary'>
                    เงินต้นคงเหลือ
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    วงเงินสูงสุด
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='body1' fontWeight={600}>
                    20,000 บาท
                  </Typography>
                  <Typography variant='body1' color='textSecondary'>
                    50,000 บาท
                  </Typography>
                </Box>

                <LinearProgress
                  variant='determinate'
                  value={40}
                  sx={{
                    mb: 2,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant='caption' color='textSecondary'>
                    ประเภท
                  </Typography>
                  <Box>
                    <Typography variant='body2'>สัญญา 000001</Typography>
                    <Typography variant='caption' color='textSecondary'>
                      ลงวันที่ 01/01/01(25xx)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='caption' color='textSecondary' sx={{ display: 'block', textAlign: 'right' }}>
                    สถานะ
                  </Typography>
                  <Chip
                    label='รอเซ็นอนุมัติ'
                    size='small'
                    sx={{
                      bgcolor: 'rgba(255, 152, 0, 0.1)',
                      color: '#FF9800',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ flex: 1, bgcolor: '#fff', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='body2' color='textSecondary'>
                  เงินยืมเพื่อการประกันสุขภาพ
                </Typography>
                <Box sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', p: 0.5, borderRadius: '50%' }}>
                  <AccountBalanceIcon color='primary' fontSize='small' />
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant='caption' color='textSecondary'>
                    เงินต้นคงเหลือ
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    วงเงินสูงสุด
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='body1' fontWeight={600}>
                    50,000 บาท
                  </Typography>
                  <Typography variant='body1' color='textSecondary'>
                    50,000 บาท
                  </Typography>
                </Box>

                <LinearProgress
                  variant='determinate'
                  value={100}
                  sx={{
                    mb: 2,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#2196F3',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant='caption' color='textSecondary'>
                    ประเภท
                  </Typography>
                  <Box>
                    <Typography variant='body2'>สัญญา 000001</Typography>
                    <Typography variant='caption' color='textSecondary'>
                      ลงวันที่ 08/08/01(25xx)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='caption' color='textSecondary' sx={{ display: 'block', textAlign: 'right' }}>
                    สถานะ
                  </Typography>
                  <Chip
                    label='จ่ายแล้ว'
                    size='small'
                    sx={{
                      bgcolor: 'rgba(76, 175, 80, 0.1)',
                      color: '#4CAF50',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card sx={{ flex: 1, bgcolor: '#fff', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    เงินยืมเพื่อประกันภัยรถยนต์
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    (ผูกกับวงเงินสูงสุด)
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(255, 193, 7, 0.1)', p: 0.5, borderRadius: '50%' }}>
                  <AttachMoneyIcon color='warning' fontSize='small' />
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant='caption' color='textSecondary'>
                    เงินต้นคงเหลือ
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    วงเงินสูงสุด
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='body1' fontWeight={600}>
                    20,000 บาท
                  </Typography>
                  <Typography variant='body1' color='textSecondary'>
                    50,000 บาท
                  </Typography>
                </Box>

                <LinearProgress
                  variant='determinate'
                  value={40}
                  sx={{
                    mb: 2,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#FFC107',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant='caption' color='textSecondary'>
                    ประเภท
                  </Typography>
                  <Box>
                    <Typography variant='body2'>สัญญา 000001</Typography>
                    <Typography variant='caption' color='textSecondary'>
                      ลงวันที่ 01/01/01(25xx)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='caption' color='textSecondary' sx={{ display: 'block', textAlign: 'right' }}>
                    สถานะ
                  </Typography>
                  <Chip
                    label='รอตรวจสอบ'
                    size='small'
                    sx={{
                      bgcolor: 'rgba(255, 152, 0, 0.1)',
                      color: '#FF9800',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* เงินกู้ Section */}
      <Box>
        <Typography variant='h6' sx={{ mb: 2 }}>
          เงินกู้
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {/* Card 1 */}
          <Card sx={{ flex: 1, bgcolor: '#fff', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='body2' color='textSecondary'>
                  เงินกู้สามประเภท
                </Typography>
                <CalculateIcon color='success' />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant='caption' color='textSecondary'>
                    เงินต้นคงเหลือ
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    วงเงินสูงสุด
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='body1' fontWeight={500}>
                    20,000
                  </Typography>
                  <Typography variant='body1' color='textSecondary'>
                    50,000
                  </Typography>
                </Box>

                <LinearProgress
                  variant='determinate'
                  value={40}
                  sx={{
                    mb: 2,
                    height: 4,
                    borderRadius: 1,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4CAF50',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant='caption' color='textSecondary'>
                    ประเภท
                  </Typography>
                  <Box>
                    <Typography variant='body2'>สัญญา 000001</Typography>
                    <Typography variant='caption' color='textSecondary'>
                      ลงวันที่ 01/01/01(25xx)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='caption' color='textSecondary' sx={{ display: 'block', textAlign: 'right' }}>
                    ผู้รับเงิน
                  </Typography>
                  <Typography variant='body2' color='orange'>
                    รอเซ็นอนุมัติ
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card sx={{ flex: 1, bgcolor: '#fff', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant='body2' color='textSecondary'>
                  เงินกู้วิสาหกิจ
                </Typography>
                <AttachMoneyIcon color='warning' />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant='caption' color='textSecondary'>
                    เงินต้นคงเหลือ
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    วงเงินสูงสุด
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant='body1' fontWeight={500}>
                    500,000
                  </Typography>
                  <Typography variant='body1' color='textSecondary'>
                    500,000
                  </Typography>
                </Box>

                <LinearProgress
                  variant='determinate'
                  value={100}
                  sx={{
                    mb: 2,
                    height: 4,
                    borderRadius: 1,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#FFC107',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant='caption' color='textSecondary'>
                    ประเภท
                  </Typography>
                  <Box>
                    <Typography variant='body2'>สัญญา 000001</Typography>
                    <Typography variant='caption' color='textSecondary'>
                      ลงวันที่ 01/01/01(25xx)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='caption' color='textSecondary' sx={{ display: 'block', textAlign: 'right' }}>
                    ผู้รับเงิน
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    ยังไม่มีรายการเงินกู้วิสาหกิจ
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export { DashBoard };
