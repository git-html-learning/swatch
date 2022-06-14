<template>
  <div class="layout">
    <div
      class="title"
      style="text-align: center;
               color: #00f6ff; font-size: 23px; line-height: 60px; height: 60px;"
    >
      <img src="@/assets/img/icon05.png" alt />
      当前手环基本信息
      <span v-if="!cardShow">({{this.productMessage.productName}})</span>
         <span style = "margin-top: 30px; height: 50px;">
<svg style = "float: right; margin-right: 50px; line-height: 50px; " @click = "logout"  t="1655173250592" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5849" width="30" height="30"><path d="M980.522459 379.849054C933.428449 222.83239 809.469502 99.652683 650.314927 53.038205v332.705093c0 76.065717-61.979473 137.395824-138.824429 137.395824-76.854946 0-138.824429-61.340098-138.82443-137.395824V53.527727C113.838829 129.103922-33.916878 398.500839 42.438556 654.650693c76.355434 256.149854 348.55961 402.387044 607.866381 326.810848 259.316761-75.566205 406.582946-345.452644 330.217522-601.612487z" p-id="5850" fill="#d4237a"></path><path d="M511.480507 434.815376c38.182712 0 69.412215-30.909815 69.412215-68.702908V90.331785c0-37.783102-31.239493-68.702907-69.412215-68.702907C473.307785 21.638868 442.068293 52.548683 442.068293 90.331785v275.780683c0 37.783102 31.239493 68.702907 69.412214 68.702908z" p-id="5851" fill="#d4237a"></path></svg>
    </span>
    </div>
    <el-card
      v-if="cardShow"
      style="height: 300px; width: 30%; margin-left: 35%; background: transparent; backdrop-filter: blur(20px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      z-index: 5;"
    >
      <el-row type="flex" justify style="height: 200px;">
        <el-col :span="18">
          <el-row style="color: #fff; font-size: 20px;">
            <!-- <el-col :span = "6" style = "line-height: 300px;">
        </el-col>
            <el-col :span = "18"></el-col>-->
            <p>
              <el-row type="flex" justify style="text-align: center">
                <el-col :span="10">手环名称：</el-col>
                <el-col :span="14">{{productMessage.productName}}</el-col>
              </el-row>
            </p>
            <p>
              <el-row type="flex" justify style="text-align: center">
                <el-col :span="10">标识</el-col>
                <el-col :span="14">{{productMessage.typeIdentify}}</el-col>
              </el-row>
            </p>
            <p>
              <el-row type="flex" justify style="text-align: center">
                <el-col :span="10">所属围栏:</el-col>
                <el-col :span="14">{{productMessage.extraInfo.fence}}</el-col>
              </el-row>
            </p>
            <p>
              <el-row type="flex" justify style="text-align: center">
                <el-col :span="10">状态：</el-col>
                <el-col :span="14">
                  <el-tag
                    effect="dark"
                    size="mini"
                    :type="
                productMessage.extraInfo.groupStatus.status == 'un'
                  ? '未分组'
                  : productMessage.extraInfo.groupStatus.status == 'user'?'组员':'组长'
              "
                    disable-transitions
                  >
                    {{
                    productMessage.extraInfo.groupStatus.status == 'un'
                    ? '未分组'
                    : productMessage.extraInfo.groupStatus.status == 'user'?'组员':'组长'
                    }}
                  </el-tag>
                </el-col>
              </el-row>
            </p>

            <!-- 状态: {{"productMessage.extraInfo.groupStatus.status == 'un'?'未分组':productMessage.extraInfo.groupStatus.status == 'user':'组长'?'组员'" }} -->
          </el-row>
        </el-col>
        <el-col :span="6" style="text-align: center; line-height: 250px;">
          <svg
            t="1655175993322"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8269"
            width="120"
            height="120"
          >
            <path
              d="M590.106 778.157A188.173 188.173 0 0 1 515.2 793.6c-26.611 0-51.942-5.504-74.906-15.443l10.522 66.643h128.768l10.522-66.643z m-223.61-57.011A187.987 187.987 0 0 1 326.4 604.8V470.4a188.006 188.006 0 0 1 41.357-117.94l24.237-153.446c2.38-15.09 15.52-26.214 30.956-26.214h184.5c15.436 0 28.576 11.123 30.956 26.214l24.237 153.447A188.006 188.006 0 0 1 704 470.4v134.4c0 43.891-14.976 84.282-40.096 116.346l-25.498 161.44c-2.38 15.09-15.52 26.214-30.956 26.214h-184.5c-15.436 0-28.576-11.123-30.956-26.214l-25.498-161.44z m222.528-424.57l-9.44-59.776H450.816l-9.44 59.776A188.198 188.198 0 0 1 515.2 281.6c26.195 0 51.142 5.338 73.824 14.976zM518.4 448a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0 117.03a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0 117.024a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
              p-id="8270"
              fill="#e6e6e6"
            />
          </svg>
        </el-col>
      </el-row>
      <el-button style="float: right; margin-right: 20px;" type="primary" @click="bind">用户绑定</el-button>
    </el-card>
    <div v-if="!cardShow">
      <div
        slot="header"
        style="padding: 0px; margin: 0px; color: #fff; width: 90%; margin-left: 5%;"
      >
        <span style="color:#00e1ed; font-size: 22px;">状态：</span>

        <table border="1" cellspacing="0" style="margin-left: 10px; margin-top:20px;">
          <tr
            style="height: 30px; line-height: 30px; background-color:#010d50; border: 1px solid #19308e"
          >
            <td
              style="font-size: 15px; padding: 5px 20px; width: 150px; text-align: center; color: #9d9fa5"
            >分组情况</td>
            <td
              style="font-size: 15px; padding: 5px 20px; width: 200px; text-align: center;background-color:#00093c; color: #9d9fa5"
            >
              {{
              productMessage.extraInfo.groupStatus.status == 'un'
              ? '未分组'
              : productMessage.extraInfo.groupStatus.status == 'user'?'组员':'组长'
              }}
              <span
                v-if="this.productMessage.extraInfo.groupStatus.status !== 'un'"
              >({{productMessage.extraInfo.groupStatus.groups}})</span>
            </td>
            <td
              style="font-size: 15px; padding: 5px 20px; width: 150px; text-align: center; color: #9d9fa5"
            >在线情况</td>
            <td
              style="font-size: 15px; padding: 5px 20px; width: 200px; text-align: center;background-color:#00093c; color: #9d9fa5"
            >{{productMessage.extraInfo.status}}</td>
          </tr>
        </table>
      </div>
      <div class="latest" style="width: 90%; margin-left: 5%; min-height: 200px; margin-top: 40px;">
        <div>
          <div
            slot="header"
            style="padding: 0px; margin: 0px; color: #00e1ed; font-size: 22px;"
          >最新数据展示</div>
          <el-row type="flex" justify :gutter="20" style="margin-top: 20px; color: #fff;">
            <el-col :span="6">
              <div class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style="text-align: center;">
                    <p>温度</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.body}}</span>
                      <span style="margin-left:10px;">℃</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style="text-align: center;">
                    <p>
                      <svg
                        t="1654496594344"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="6924"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M259 828.8c-16.3 0-31.7-6.3-43.2-17.8l-1.4-1.4c-23.8-23.8-23.8-62.6 0-86.4l96-96c-17.2-44.3-6.9-95.1 27-129l266.8-266.8c51.5-51.5 135.4-51.5 186.9 0l-9.5 9.5 9.5-9.5c24.4 24.4 37.8 56.9 37.8 91.6 0 34.7-13.4 67.2-37.8 91.6L522.5 683.3c-32.1 32.1-79.2 43.2-122.1 29.5L302.2 811c-11.5 11.5-26.8 17.8-43.2 17.8z m438.8-609.1c-28.2 0-54.7 10.9-74.5 30.7L356.5 517.3c-28.1 28.1-35.3 71.2-18 107.2 2.5 5.1 1.4 11.3-2.6 15.3L233.4 742.2c-13.3 13.3-13.3 35 0 48.3l1.4 1.4c6.4 6.4 15 10 24.2 10s17.8-3.5 24.2-10l104.2-104.2c3.8-3.8 9.5-5 14.5-3 35.1 14.1 75 6.1 101.5-20.5l268.7-268.7c19.3-19.3 29.9-45.1 29.9-72.6 0-27.5-10.6-53.3-29.9-72.6-19.7-19.7-46.1-30.6-74.3-30.6z"
                          fill="#4586FC"
                          p-id="6925"
                        />
                        <path
                          d="M263 767.8c-2.6 0-5.2-1-7.1-3-3.9-3.9-3.9-10.3 0-14.3l430.8-430.8c3.9-3.9 10.3-3.9 14.3 0 3.9 3.9 3.9 10.3 0 14.3L270.1 764.9c-1.9 2-4.5 2.9-7.1 2.9zM648.4 313.7c-3 0-6-1.1-8.3-3.4L598 268.2c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l42.1 42.1c4.6 4.6 4.6 12 0 16.6-2.3 2.3-5.3 3.4-8.3 3.4zM581.1 368.4c-3 0-6-1.1-8.3-3.4L537 329.2c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l35.8 35.8c4.6 4.6 4.6 12 0 16.6-2.3 2.3-5.3 3.4-8.3 3.4zM513.7 448.4c-3 0-6-1.1-8.3-3.4l-42.1-42.1c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l42.1 42.1c4.6 4.6 4.6 12 0 16.6-2.3 2.3-5.3 3.4-8.3 3.4zM442.1 507.4c-3 0-6-1.1-8.3-3.4L398 468.1c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l35.8 35.8c4.6 4.6 4.6 12 0 16.6-2.2 2.3-5.3 3.5-8.3 3.5zM397.9 564.2c-3 0-6-1.1-8.3-3.4l-42.1-42.1c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l42.1 42.1c4.6 4.6 4.6 12 0 16.6-2.2 2.2-5.3 3.4-8.3 3.4z"
                          fill="#4586FC"
                          p-id="6926"
                        />
                        <path
                          d="M263.2 775.5c-4.3 0-8.6-1.6-11.9-4.9-6.6-6.6-6.6-17.2 0-23.8l58.9-58.9c6.6-6.6 17.2-6.6 23.8 0 6.6 6.6 6.6 17.2 0 23.8l-58.9 58.9c-3.3 3.3-7.6 4.9-11.9 4.9z"
                          fill="#FE5862"
                          p-id="6927"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style="text-align: center;">
                    <p>腕温</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.skin}}</span>
                      <span style="margin-left:10px;">℃</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style="text-align: center;">
                    <p>
                      <svg
                        t="1654497095057"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2553"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M537.591817 230.653672c-34.062708-24.389002-127.959085-25.591817-127.959085-25.591817l102.367268-102.367268c39.769684 16.429947 179.142719 153.550902 179.142719 153.550903l-102.367268 76.775451s-17.120926-77.978266-51.183634-102.367269z m421.650777 443.224679c-47.114535 53.845183-96.557926 105.20796-140.447892 161.637917-100.499065 129.110717-234.421044 186.487571-394.497859 187.869528-61.164443 0.537428-138.349363-0.025592-182.136962 0-43.787599 0.051184-43.787599-9.315421-78.541286-44.350618 82.405651 0 161.12608 5.502241 239.667366 7.907871 179.705739 5.502241 326.244483-72.578393 426.948284-222.11138 32.911077-48.854779 76.417166-89.136299 115.470278-133.896387 18.298149-20.934106 16.813824-40.921315-5.809342-63.314155-7.191301-7.088933-13.435704-17.60717-15.073581-27.408836-19.270638-113.627668-84.043527-196.34042-169.392237-266.129305-79.129898-64.670522-157.594409-127.191331-230.633454-198.746051-36.698666-35.930911-83.198997-46.039679-128.291779-22.648758-46.065271 23.877165-93.10303 46.295597-135.534263 76.391574-17.223293 12.232889-39.334623 32.245689-18.809986 51.618695 43.506089 41.151642 100.678208 74.625738 161.12608 79.129898 19.987209 1.458734 46.372372-6.014077 60.754974-20.98529 28.176591-29.353814 45.169557-11.004481 64.491379 14.536152 20.627005 27.255285 33.064628 52.514409 36.826624 86.039689 7.165709 63.902767 34.574545 137.760751 40.921316 179.142719 2.763916 18.195782-6.167628 25.540633-19.29623 31.324384-24.133083 6.423546-46.014087 6.039669-70.070395 7.242484-50.953308 2.610365-98.221394 19.884842-124.197088 64.696114-9.85285 17.069742-23.698023 41.023683-43.736415 41.023682-20.166352 0-127.498432-2.53359-197.210542 18.656435-18.937945 5.706975-37.261686 13.512479-55.969304 19.961617-15.534233 5.34869-34.0883 15.687784-42.81511-7.012158-7.472811-19.552148 10.825339-25.822143 24.798471-31.605894 74.139494-30.658997 150.351925-52.156123 231.657127-40.998091 27.357652 3.736405 43.071028-2.53359 59.756893-26.333979 38.976337-55.559835 94.587356-85.374302 164.427424-81.842631 27.17851 1.381958 35.726177-3.582854 25.515042-32.424832-16.250804-45.732577-24.64492-93.614867-31.785037-141.82985-8.112606-54.740897-24.107492-63.570073-74.625738-48.650044-77.850307 22.981452-213.691672-37.364053-249.161931-110.070405-11.030073-22.571983-7.268076-41.586703 11.081257-57.248895A625.899069 625.899069 0 0 1 424.296843 4.831479c34.779279-11.618685 70.14717-2.149713 98.707638 22.444024 108.534896 93.435724 218.067873 185.847775 324.529832 281.586762 57.786323 51.97698 92.923888 119.692928 112.808729 194.804911 3.122202 11.69546 4.376201 25.873327 11.82342 34.113893 45.886128 50.774165 24.798471 93.077438-12.923868 136.097282z m-610.28806-11.030073h0.051183-0.051183z"
                          fill="#2EA9FF"
                          p-id="2554"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style="text-align: center;">
                    <p>心率</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.heartRate}}</span>
                      <span style="margin-left:10px;">次/分</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style="text-align: center;">
                    <p>
                      <svg
                        t="1655196910896"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="9268"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M128 458.6c-4.6 0-9.2-2.4-11.7-6.7-20.4-34-31.1-73.1-31.1-112.9 0-121.5 98.8-220.3 220.3-220.3 55.2 0 108.1 20.5 148.7 57.8 26.1 23.9 45.8 53.4 57.9 86 12-32.5 31.7-62 57.9-86 40.7-37.3 93.5-57.8 148.7-57.8C840.2 118.7 939 217.5 939 339c0 39.8-10.8 78.9-31.1 112.9-3.9 6.5-12.3 8.6-18.7 4.7-6.5-3.9-8.6-12.3-4.7-18.7 17.8-29.8 27.2-64 27.2-98.9 0-106.4-86.6-192.9-192.9-192.9-100.2 0-182.8 75.2-192.1 174.8-0.4 4.4-2.9 8.3-6.7 10.5-2.4 1.4-5.1 2-7.8 1.8-2.7 0.2-5.4-0.4-7.8-1.8-3.8-2.2-6.3-6.1-6.7-10.5-9.3-99.7-91.9-174.8-192.1-174.8-106.4 0-192.9 86.6-192.9 192.9 0 34.9 9.4 69.1 27.2 98.9 3.9 6.5 1.8 14.9-4.7 18.7-2.4 1.3-4.8 2-7.2 2zM512.2 905.2c-3.6 0-7.1-1.4-9.7-4L213.9 612.7c-5.3-5.3-5.3-14 0-19.3 5.3-5.3 14-5.3 19.3 0l278.9 278.9 278.6-278.6c5.3-5.3 14-5.3 19.3 0 5.3 5.3 5.3 14 0 19.3L521.8 901.2c-2.5 2.6-6 4-9.6 4z"
                          fill="#41B3F9"
                          p-id="9269"
                        />
                        <path
                          d="M479.7 680.8c-5 0-9.6-2.7-12-7.1L356 469.7l-39 77.1c-2.3 4.6-7 7.5-12.2 7.5H75.7c-7.5 0-13.7-6.1-13.7-13.7 0-7.5 6.1-13.7 13.7-13.7h220.7l47-92.7c2.3-4.5 6.9-7.4 12-7.5 5-0.1 9.8 2.7 12.2 7.1L477.2 634l107.4-297.6c2-5.5 7.3-9.2 13.2-9 5.9 0.2 11 4.1 12.7 9.7L668 526.9h280.3c7.5 0 13.7 6.1 13.7 13.7 0 7.5-6.1 13.7-13.7 13.7H657.9c-6 0-11.3-3.9-13.1-9.7l-48.5-160.1-103.7 287.3c-1.8 5.1-6.4 8.6-11.8 9h-1.1z"
                          fill="#FFFF27"
                          p-id="9270"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style="text-align: center;">
                    <p>步数</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.stepNum}}</span>
                      <span style="margin-left:10px;">步</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style="text-align: center;">
                    <p>
                      <svg
                        t="1654496797193"
                        class="icon"
                        viewBox="0 0 1334 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1320"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M257.31184 43.016792q496.678974 243.271334 525.398506 290.574093c29.282661 47.865888 0 87.847982 16.330715 137.966382s42.234607 48.429016 123.325051 60.817833a559.186192 559.186192 0 0 0 164.433402-14.64133 168.938427 168.938427 0 0 1 197.094831 134.587613 149.228943 149.228943 0 0 1 0 31.535173v190.900422h-516.388457L85.557773 492.956134z"
                          fill="#E9EBF9"
                          p-id="1321"
                        />
                        <path
                          d="M1286.709986 916.991585h-519.204098a38.29271 38.29271 0 0 1-20.272611-5.631281L64.722033 530.122588a43.360863 43.360863 0 0 1-18.583226-52.370912l171.754067-450.502471a43.360863 43.360863 0 0 1 23.651379-23.65138 42.797735 42.797735 0 0 1 34.350814 0c506.81528 248.339487 530.466659 286.069069 542.855477 306.341681a153.733968 153.733968 0 0 1 18.020099 100.799927 99.110544 99.110544 0 0 0 0 45.050247c7.883793 20.835739 7.883793 20.835739 66.449114 29.845789l23.65138 3.378769a498.368358 498.368358 0 0 0 149.792072-14.641331 212.299289 212.299289 0 0 1 246.650102 168.938427 233.135029 233.135029 0 0 1 3.378769 39.418966v190.900422a42.234607 42.234607 0 0 1-39.982094 43.360863z m-506.81528-84.469213h465.706929v-148.665816a112.625618 112.625618 0 0 0 0-23.651379 126.140692 126.140692 0 0 0-148.102687-100.799928 585.090084 585.090084 0 0 1-177.948476 14.64133l-23.088252-3.378768c-65.322858-9.573178-108.683721-16.330715-133.461357-85.032342a172.317195 172.317195 0 0 1-6.757537-80.527317 72.643523 72.643523 0 0 0-6.194409-48.992143C734.281331 344.290319 668.958472 293.045663 280.400091 101.582113L137.928685 473.809779z"
                          fill="#3244E0"
                          p-id="1322"
                        />
                        <path
                          d="M41.633782 599.387343l703.910111 390.810893h541.729221a11.262562 11.262562 0 0 0 11.262561-11.262561v-119.383155h-537.224196l-675.753706-387.995253-48.429016 112.625618a10.699434 10.699434 0 0 0 4.505025 15.204458z"
                          fill="#E9EBF9"
                          p-id="1323"
                        />
                        <path
                          d="M1287.273114 1023.985922H734.281331l-711.230776-394.189662a45.050247 45.050247 0 0 1-19.709483-56.312809L69.227058 423.128251l701.09447 402.636584h563.128089v153.17084a45.050247 45.050247 0 0 1-46.176503 45.050247zM753.990814 958.099935h510.757176v-64.75973h-512.44656L101.888487 519.423154l-25.903892 60.254706zM375.00561 1022.859666H85.557773a33.787685 33.787685 0 0 1 0-67.575371h289.447837a33.787685 33.787685 0 0 1 0 67.575371zM227.466051 888.272052H87.247157a33.787685 33.787685 0 0 1 0-67.57537H227.466051a33.787685 33.787685 0 1 1 0 67.57537z"
                          fill="#3244E0"
                          p-id="1324"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="guiji" style="margin-top: 20px; width: 90%; margin-left: 5%;">
        <p slot="header" style="color:#00e1ed; font-size: 22px;">手环轨迹展示(两天内)</p>
        <!-- <div id="map"></div> -->
        <baidu-map
          id="map"
          :center="center"
          :zoom="15"
          :scroll-wheel-zoom="true"
          Animation="BMAP_ANIMATION_DROP"
          v-loading="loading1"
          v-if="show1"
        >
          <bm-polyline
            :path="polylinePath"
            stroke-color="red"
            :stroke-opacity="1"
            :stroke-weight="2"
          ></bm-polyline>
        </baidu-map>
        <div v-if="!show1">
          <p style="text-align: center; margin-top: 100px;">
            <img src="@/assets/img/无数据2.png" alt />
            <br />近两天没有历史数据
          </p>
        </div>
      </div>
          <div class="heartRate">
        <div class="left">
          <p slot="header" style="padding: 0px; margin: 0px; color: #00f6fe">温度统计（一天内）</p>
          <div id="wendu" v-loading="loading2" v-if="show2"></div>
          <div v-if="!show2">
            <p style="text-align: center; margin-top: 100px;">
              <img src="@/assets/img/暂无数据.png" alt />
              <br />近一天没有历史数据
            </p>
          </div>
        </div>
        <div class="right">
          <p slot="header" style="padding: 0px; margin: 0px; color: #00f6fe">心率血压统计（一天内）</p>
          <div id="heart" v-loading="loading3" v-if="show3"></div>
          <div v-if="!show3">
            <p style="text-align: center; margin-top: 100px;">
              <img src="@/assets/img/暂无数据.png" alt />
              <br />近一天没有历史数据
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px">
        <el-form-item
          prop="name"
          label="姓名"
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
        >
          <el-input v-model="ruleForm.name" clearable class="Input" placeholder="必填项"></el-input>
        </el-form-item>
        <el-form-item
          prop="age"
          label="年龄"
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
        >
          <el-input v-model="ruleForm.age" clearable class="Input" placeholder="必填项"></el-input>
        </el-form-item>
        <el-form-item
          prop="gender"
          label="性别"
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
        >
          <el-select v-model="ruleForm.gender" class="select" placeholder="请选择">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="idNumber"
          label="身份证号 "
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
                    {
                pattern: /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/,
            required: true,
            message: '格式不对',
            trigger: 'blur',
          }
        ]"
        >
          <el-input v-model="ruleForm.idNumber" clearable class="Input" placeholder="必填项"></el-input>
        </el-form-item>

        <el-form-item
          prop="phone"
          label="联系方式 "
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
             {
                pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
            required: true,
            message: '格式不对',
            trigger: 'blur',
          }
        ]"
        >
          <el-input v-model="ruleForm.phone" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item
          prop="connect1.user"
          label="紧急联系人1 "
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          }
        ]"
        >
          <el-input v-model="ruleForm.connect1.user" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item
          prop="connect1.phone"
          label="紧急联系方式1 "
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          }
        ]"
        >
          <el-input v-model="ruleForm.connect1.phone" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="connect2.user" label="紧急联系人2 ">
          <el-input v-model="ruleForm.connect2.user" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="connect2.phone" label="紧急联系方式2 ">
          <el-input v-model="ruleForm.connect2.phone" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="blood" label="血型">
          <el-select class="select" v-model="ruleForm.blood">
            <el-option label="A型" value="A"></el-option>
            <el-option label="B型" value="B"></el-option>
            <el-option label="AB型" value="AB"></el-option>
            <el-option label="O型" value="O"></el-option>
            <el-option label="Rh型" value="Rh"></el-option>
            <el-option label="不了解" value="unknow"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="allergy" label="过敏史">
          <el-input v-model="ruleForm.allergy" clearable class="Input" placeholder="选填项"></el-input>
        </el-form-item>
        <el-form-item label="特殊情况备注" prop="description">
          <el-input
            type="textarea"
            clearable
            v-model="ruleForm.description"
            class="Input"
            placeholder="可选"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="bind1('ruleForm')">绑定</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { UserDetail, UserLogin } from "@/api/admin";
import { getDeviceDatas,historyData } from "@/api/index";
export default {
  name: "user",
  data() {
    return {
      user: "",
      productKey: "",
      productMessage: { "121": "13" },
      drawer: false,
      ruleForm: {
        name: "",
        age: "",
        gender: "",
        idNumber: "",
        phone: "",
        connect1: {
          user: "",
          phone: ""
        },
        connect2: {
          user: "",
          phone: ""
        },
        blood: "",
        allergy: "",
        description: ""
      },
      cardShow: true,
            center: { lng: 117.192342, lat: 31.770919 }, // 中心点坐标
                zoom: 12,
      pl: null,
      bmap: null,
          loading1: true,
      loading2: true,
      loading3: true,
      show1: true,
      show2: true,
      show3: true,
            polylinePath: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.405, lat: 39.92 },
        { lng: 116.423493, lat: 39.907445 }
      ],
      deviceList:[],
      judge :[],
    };
  },
  created() {
    this.prepare();
  },
  methods: {
    prepare() {
      var username = window.sessionStorage.getItem("username");
      UserDetail(username).then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.productKey = res.data.extraInfo.productKey;
          //   console.log(this.productKey);
          getDeviceDatas({
            username: "admin",
            pkList: [this.productKey],
            startTime: 11111
          }).then(res1 => {
            console.log(res1);
            this.productMessage = res1.data[0];
            if (res1.data[0].extraInfo.userMessage == undefined) {
              this.cardShow = true;
            } else {
              this.cardShow = false;
            }
            if (this.productMessage.deviceData !== null) {
              this.productMessage.deviceName = [];
              this.productMessage.latestData = [];
              for (var i = 0; i < this.productMessage.deviceData.length; i++) {
                this.productMessage.deviceName.push(
                  this.productMessage.deviceData[i].deviceName
                );
              }
              if (this.productMessage.extraInfo.fence !== "-") {
                UserDetail(username).then(res => {
                  console.log(res);
                  this.fenceList = res.data.extraInfo.fence;
                  console.log(this.fenceList);
                  if (
                    this.fenceList.length !== 0 ||
                    this.fenceList !== null ||
                    this.fenceList !== undefined
                  ) {
                    for (var i = 0; i < this.fenceList.length; i++) {
                      if (
                        this.productMessage.extraInfo.fence ==
                        this.fenceList[i].fence.fenceName
                      ) {
                        this.productMessage.latestData.fence = this.fenceList[
                          i
                        ].fence.data;
                      }
                    }
                  }
                });
              } else {
                this.productMessage.latestData.fence = "-";
              }
              if (this.productMessage.deviceName.includes("BA")) {
                this.productMessage.latestData.body = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("BA")
                ].extraInfo.body;
                this.productMessage.latestData.skin = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("BA")
                ].extraInfo.skin;
              } else {
                this.productMessage.latestData.body = "-";
                this.productMessage.latestData.skin = "-";
              }
              if (this.productMessage.deviceName.includes("C2")) {
                this.productMessage.latestData.heartRate = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("C2")
                ].extraInfo.BPHeart;
                this.productMessage.latestData.bpHigh = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("C2")
                ].extraInfo.BPHigh;
                this.productMessage.latestData.bpLow = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("C2")
                ].extraInfo.BPLow;
              } else {
                this.productMessage.latestData.heartRate = "-";
                this.productMessage.latestData.bpHigh = "-";
                this.productMessage.latestData.bpLow = "-";
              }
              //   if (this.productMessage.deviceName.includes("F6")) {
              //      this.productMessage.latestData.stepNum =
              //     this.productMessagedeviceData[
              //         this.productMessage.deviceName.indexOf("F6")
              //       ].extraInfo.stepNum;
              //    this.productMessage.latestData.heart =
              //    this.productMessage.deviceData[
              //       this.productMessage.deviceName.indexOf("F6")
              //       ].extraInfo.timeStamp;
              //   } else {
              //     this.productMessage.latestData.stepNum = "-";
              //    this.productMessage.latestData.heart = "-";
              //   }
              if (this.productMessage.deviceName.includes("F6")) {
                this.productMessage.latestData.stepNum = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("F6")
                ].extraInfo.stepNum;
                this.productMessage.latestData.heart = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("F6")
                ].extraInfo.timeStamp;
              } else {
                this.productMessage.latestData.stepNum = "-";
                this.productMessage.latestData.heart = "-";
              }
              if (this.productMessage.deviceName.includes("A4")) {
                this.productMessage.latestData.location = this.productMessage.deviceData[
                  this.productMessage.deviceName.indexOf("A4")
                ].extraInfo;
              } else {
                this.productMessage.latestData.location = "-";
              }
            } else {
              this.productMessage.latestData = {
                body: "-",
                skin: "-",
                heartRate: "-",
                bpHigh: "-",
                bpLow: "-",
                stepNum: "-",
                location: "",
                heart: "-",
                fence: "-",
                ifIn: "-"
              };
            }

            var date1 = Math.round(new Date().getTime() / 1000);
            if (this.productMessage.latestData.heart == "-") {
              this.productMessage.extraInfo.status = "未激活";
            } else if (date1 - this.productMessage.latestData.heart <= 7200) {
              this.productMessage.extraInfo.status = "在线";
            } else {
              this.productMessage.extraInfo.status = "离线";
            }
            console.log(this.productMessage);
            this.product = this.productMessage;
            this.deviceList = [];
            this.productMessage.deviceData.forEach(item=>{
                   if (item.deviceName == "A4") {
              this.obj = {
                deviceType: "位置信息",
                deviceKey: item.deviceKey
              };
              this.deviceList.push(this.obj);
            }
            if (item.deviceName == "BA") {
              this.obj = {
                deviceType: "温度",
                deviceKey: item.deviceKey
              };
              this.deviceList.push(this.obj);
            }
            if (item.deviceName == "C2") {
              this.obj = {
                deviceType: "心率",
                deviceKey: item.deviceKey
              };
              this.deviceList.push(this.obj);
            }
            })
                  if (this.deviceList.length == 0) {
            this.dataShow = false;
          } else {
            this.dataShow = true;
            this.deviceList.forEach(item => {
              var time = Math.round(new Date() / 1000);
              var startTime = time - 172800;
              var startTime1 = time - 86400;
              if (item.deviceType == "位置信息") {
                //开始请求坐标的历史数据
                console.log(time);
                console.log(startTime);
                var payload = {
                  deviceKey: item.deviceKey,
                  startTime: startTime,
                  endTime: time,
                  asc: 1
                };
                historyData(payload).then(res => {
                  console.log(res);
                  if (res.msg == "ok") {
                    this.loading1 = false;
                    var trace = res.data.deviceData;
                    this.center = {
                      lng: trace[0].extraInfo.location.split(",")[0],
                      lat: trace[0].extraInfo.location.split(",")[1]
                    };
                    this.polylinePath = [];
                    trace.forEach(item1 => {
                      item1.position = {
                        lng: item1.extraInfo.location.split(",")[0],
                        lat: item1.extraInfo.location.split(",")[1]
                      };
                      // console.log(item1.position)
                      this.polylinePath.push(item1.position);
                    });
                  } else {
                    console.log(res.msg);
                    this.show1 = false;
                  }
                });
              }
              if (item.deviceType == "温度") {
                var payload = {
                  deviceKey: item.deviceKey,
                  startTime: startTime1,
                  endTime: time,
                  asc: 1
                };
                historyData(payload).then(res => {
                  if (res.msg == "ok") {
                    console.log(res);
                    this.loading2 = false;
                    this.date1 = [];
                    var wenduList1 = res.data.deviceData;
                    this.wenduList = [
                      {
                        name: "腕温",
                        type: "line",
                        symbol: "none",
                        data: [],
                        markLine: {
                          data: [{ type: "average", name: "Avg" }]
                        }
                      },
                      {
                        name: "体温",
                        type: "line",
                        symbol: "none",
                        data: [],
                        markLine: {
                          data: [{ type: "average", name: "Avg" }]
                        }
                      }
                    ];
                    wenduList1.forEach(item2 => {
                      this.date1.push(item2.date);
                      this.wenduList[0].data.push(item2.extraInfo.skin);
                      this.wenduList[1].data.push(item2.extraInfo.body);
                    });
                    // console.log(this.date1)
                    // console.log(this.wenduList)
                    this.echarts1();
                  } else {
                    console.log(res.msg);
                    this.show2 = false;
                  }
                });
              }
              if (item.deviceType == "心率") {
                var payload = {
                  deviceKey: item.deviceKey,
                  startTime: startTime1,
                  endTime: time,
                  asc: 1
                };
                historyData(payload).then(res => {
                  if (res.msg == "ok") {
                    console.log(res);
                    this.loading3 = false;
                    this.date2 = [];
                    var heartList1 = res.data.deviceData;
                    this.heartList = [
                      {
                        name: "心率",
                        type: "line",
                        symbol: "none",
                        data: [],
                        markLine: {
                          data: [{ type: "average", name: "Avg" }]
                        }
                      },
                      {
                        name: "收缩压",
                        type: "line",
                        symbol: "none",
                        data: [],
                        markLine: {
                          data: [{ type: "average", name: "Avg" }]
                        }
                      },
                      {
                        name: "舒张压",
                        type: "line",
                        symbol: "none",
                        data: [],
                        markLine: {
                          data: [{ type: "average", name: "Avg" }]
                        }
                      }
                    ];
                    heartList1.forEach(item3 => {
                      this.date2.push(item3.date);
                      this.heartList[0].data.push(item3.extraInfo.BPHeart);
                      this.heartList[1].data.push(item3.extraInfo.BPHigh);
                      this.heartList[2].data.push(item3.extraInfo.BPLow);
                    });
                    // console.log(this.date1)
                    // console.log(this.wenduList)
                    this.echarts2();
                  } else {
                    console.log(res.msg);
                    this.show3 = false;
                  }
                });
              }
            });
          }

          });
        }
      });
    },
    bind() {
      console.log("绑定");
      this.drawer = true;
    },
    bind1(formName) {
      console.log(formName);
      console.log(this.ruleForm);
      //    this.$refs[formName].validate(valid => {
      // if (valid) {
      var user = {
        username: "admin",
        password: "123456"
      };
      // 获取admin账号的token
      UserLogin(user).then(res => {
        console.log(res);
        if (res.msg == "ok") {
          var tokenForAdmin = res.data.token;
          window.sessionStorage.setItem("tokenForAdmin", res.data.token);
          console.log(this.productMessage);
          var extraInfo = this.productMessage.extraInfo;
          console.log(extraInfo);
          extraInfo.userMessage = {
            name: this.ruleForm.name,
            age: this.ruleForm.age,
            gender: this.ruleForm.gender,
            idNumber: this.ruleForm.idNumber,
            phone: this.ruleForm.phone,
            name: this.ruleForm.name,
            connect1: {
              user: this.ruleForm.connect1.user,
              phone: this.ruleForm.connect1.phone
            },
            connect2: {
              user: this.ruleForm.connect2.user,
              phone: this.ruleForm.connect2.phone
            },

            blood: this.ruleForm.blood,
            allergy: this.ruleForm.allergy,
            description: this.ruleForm.description
          };
          console.log(extraInfo);
          var adminMessage = [];
          adminMessage.push(extraInfo.userMessage);
          console.log(adminMessage);
          //修改产品信息
          var _this = this;
          _this
            .axios({
              method: "put",
              url: "https://api.ahusmart.com/api/v1/product",
              headers: {
                token: tokenForAdmin
              },
              data: {
                productName: this.productMessage.productName,
                productKey: this.productMessage.productKey,
                typeIdentify: this.productMessage.typeIdentify,
                productType: 1,
                protocolType: "TCP",
                extraInfo: extraInfo
              }
            })
            .then(res => {
              if (res.msg == "ok") {
                this.$message.success("绑定成功");
                console.log("绑定成功");
              } else {
                this.$message.error(res.msg);
              }
            });
          //修改管理员信息，即将绑定的用户信息放在管理员的token里面
          UserDetail("admin").then(res => {
            console.log(res);
            // console.log(res.data.extraInfo.userMessage)
            if (res.data.extraInfo.userMessage == undefined) {
              res.data.extraInfo.userMessage = [];
            }
            res.data.extraInfo.userMessage.push(extraInfo.userMessage);
            console.log(res.data);
            var adminToken = window.sessionStorage.getItem("adminToken");
            var _this = this;
            _this
              .axios({
                method: "put",
                url: "https://api.ahusmart.com/api/v1/admin/user/admin",
                headers: {
                  token: adminToken
                },
                data: {
                  username: res.data.username,
                  password: res.data.password,
                  email: res.data.email,
                  phone: res.data.phone,
                  Wechat: res.data.Wechat,
                  userAddress: res.data.userAddress,

                  extraInfo: res.data.extraInfo
                }
              })
              .then(res1 => {
                console.log(res1);
                if (res1.data.msg == "ok") {
                  console.log("管理员信息修改成功");
                }
              });
          });
        }
      });
      // }
      // else {
      //   this.$message({
      //     showClose: true,
      //     message: "error input！",
      //     type: "warning"
      //   });
      //   return false;
      // }
      //    })

      // 即修改产品信息，放在extraInfo里面
    },
        echarts1() {
      var chartDom1 = document.getElementById("wendu");
      var myChart1 = echarts.init(chartDom1);
      var option1;

      option1 = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
textStyle: {
     color: "#fff" 
        },
        },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: "none"
            // },
            // dataView: { readOnly: false },
            // magicType: { type: ["line", "bar"] },
            // restore: {},
            // saveAsImage: {}
          }
        },

          color: ["#cd9136","#5a99e6"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.date1,
                     axisLabel: {   // X轴线 标签修改 
                     textStyle: {
                         color: '#fff', //坐标值得具体的颜色
                     }
                 },
                 splitLine:{  
                     show: true, // X轴线 颜色类型的修改
                     lineStyle: {
                         color: '#fff'
                     }  
                 },
                 axisLine: { 
                     show: true, // X轴 网格线 颜色类型的修改
                     lineStyle: {
                         color: '#fff'
                     }  
                 }, 
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          },
          axisLabel: {
                     formatter: '{value}',
                     textStyle: {
                         color: '#fff', //坐标值得具体的颜色
                     }
                 },
                 axisLine: { 
                     show: true, // Y轴线
                     lineStyle: {
                         type: 'dashed',
                         color: '#fff'
                     }  
                 },
                 splitLine:{  
                     show: true,
                     lineStyle: {
                         type: 'dashed',
                         color: '#fff'
                     }  
                 }  
        },
        series:
          // {
          //   name: 'Highest',
          //   type: 'line',
          //   data: [10, 11, 13, 11, 12, 12, 9]
          // },
          // {
          //   name: 'Lowest',
          //   type: 'line',
          //   data: [1, -2, 2, 5, 3, 2, 0]
          // }
          this.wenduList
      };

      option1 && myChart1.setOption(option1);
    },
    echarts2() {
      var chartDom2 = document.getElementById("heart");
      var myChart2 = echarts.init(chartDom2);
      var option2;

      option2 = {
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: "none"
            // },
            // dataView: { readOnly: false },
            // magicType: { type: ["line", "bar"] },
            // restore: {},
            // saveAsImage: {}
          }
        },
        color: ["#e89743","#e92d3a","#00cf89"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.date2,
                      axisLabel: {   // X轴线 标签修改 
                     textStyle: {
                         color: '#fff', //坐标值得具体的颜色
                     }
                 },
                 splitLine:{  
                     show: true, // X轴线 颜色类型的修改
                     lineStyle: {
                         color: '#fff'
                     }  
                 },
                 axisLine: { 
                     show: true, // X轴 网格线 颜色类型的修改
                     lineStyle: {
                         color: '#fff'
                     }  
                 }, 
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          },
             axisLabel: {
                     formatter: '{value}',
                     textStyle: {
                         color: '#fff', //坐标值得具体的颜色
                     }
                 },
                 axisLine: { 
                     show: true, // Y轴线
                     lineStyle: {
                         type: 'dashed',
                         color: '#fff'
                     }  
                 },
                 splitLine:{  
                     show: true,
                     lineStyle: {
                         type: 'dashed',
                         color: '#fff'
                     }  
                 }  

        },
        series: this.heartList
      };

      option2 && myChart2.setOption(option2);
    },
         async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  }
};
</script>
<style lang="scss" scoped>
.layout {
  padding: 30px;
  background-color: #fff;
  .latest {
    .card {
      backdrop-filter: blur(20px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
    }
    background-color: #222749;
  }
  .guiji {
    width: 100%;
    height: 380px;
    #map {
      height: 300px;
      width: 100%;
      padding: 0px;
      margin: 0px;
    }
  }
  .heartRate {
  height: 380px;
  width: 100%;
  margin-top: 30px;
}
.left {
  float: left;
  margin-left: 1%;
  width: 49%;
  height: 350px;
}
.right {
  float: left;
  width: 49%;
  margin-left: 1%;
  height: 350px;
}
#wendu {
  width: 100%;
  height: 300px;
  /* background-color: rgb(92, 51, 51); */
}
#heart {
  width: 100%;
  height: 300px;
  /* background-color: rgb(92, 51, 51); */
}
}
</style>