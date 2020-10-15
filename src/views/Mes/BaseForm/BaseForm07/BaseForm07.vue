<template>
  <section class="baseform07">
    <component-panel 
      class="search-grid add-grid-desc"
      title="Lot List"  
    >
      <div class="cond-wrap">
        <ul>
          <li class="item-list">
            <span class="item-label">검색조건</span>
            <span class="item-input">
              <b-radio name="radio">Lot</b-radio>
              <b-radio name="radio">MS Code</b-radio>
              <b-input /><b-button type="is-dark" icon-left="magnify"/>
            </span>
          </li>
          <li class="item-list">
            <span class="item-label">Line 구분</span>
            <span class="item-input">
              <b-select>
                <option>선택</option>
              </b-select>
            </span>
          </li>
        </ul>
      </div>
      <div class="grid-wrap">
        <sk-grid
          ref="lotListGrid"
          style="width: 100%"
          :items-source="lotList"
          :initialized="initLotGrid"
          :use-checkbox="true"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span class="grid-desc">99건 조회 되었습니다.</span>
      </div>
      <div class="detail-area">
        <ul class="info-num">
          <li>
            <span class="item-label">Lot Count</span>
            <b-input value="3" />
            <span class="unit">Lot</span> 
          </li>
          <li>
            <span class="item-label">Total Length</span>
            <b-input value="485,000" />
            <span class="unit">Cm</span> 
          </li>
        </ul>
        <ul class="icon-area">
           <li class="wait">
            <b-icon 
              icon="atom-variant"
            />
            <span class="icon-label">대기</span>
          </li>
          <li class="proc">
            <b-icon 
              icon="atom-variant"
            />
            <span class="icon-label">작업중</span>
          </li>
          <li class="critical">
            <b-icon 
              icon="alarm-light"
            />
            <span class="icon-label">긴급 Lot</span>
          </li>
          <li class="hold">
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">Hold Lot</span>
          </li>
          <li>
            Unit: Cm
          </li>
        </ul>
        <ul class="proc-sel-list">
          <li><b-radio name="radio2">Cropping</b-radio></li>
          <li><b-radio name="radio2">Recropping</b-radio></li>
          <li><b-radio name="radio2">GFA</b-radio></li>
          <li><b-radio name="radio2">N-Doped</b-radio></li>
        </ul>
      </div>
    </component-panel>
    <section class="result-grid">
      <component-panel 
        class="canvas-grid"
        title="실측 Data"
      >
        
      </component-panel>
      <component-panel 
        class="data-tab-grid"
        :use-header="false"
      >
        <b-tabs>
          <b-tab-item label="Process In">
            <div class="lot-list">
              <span class="grid-title">Parent Lot</span>
              <ul>
                <li class="option-item">
                  <span class="item-label">Lot Number</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">MS Code</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">품질 평가 방법</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">수량(Cm)</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
                <li class="option-item">
                  <span class="item-label">작업자</span>
                  <span class="item-input">
                    <b-input />
                  </span>
                </li>
              </ul>
            </div>
            <div class="grid-row-wrap">
              <div class="grid-area">
                <span class="grid-title">1차 Sample 정보</span>
                <component-panel 
                  class="grid-wrap add-grid-desc"
                >
                  <sk-grid
                    ref="lotListGrid"
                    style="width: 100%"
                    :items-source="lotList"
                    :initialized="initLotGrid"
                    :use-checkbox="true"
                    :columns="lotListColumns"
                    @selection-changed="selectionChanged"
                  />
                  <span class="grid-desc">99건 조회 되었습니다.</span>
                </component-panel>
              </div>
              <div class="grid-area">
                <span class="grid-title">2차 Sample 정보</span>
                <component-panel 
                  class="grid-wrap add-grid-desc"
                >
                  <sk-grid
                    ref="lotListGrid"
                    style="width: 100%"
                    :items-source="lotList"
                    :initialized="initLotGrid"
                    :use-checkbox="true"
                    :columns="lotListColumns"
                    @selection-changed="selectionChanged"
                  />
                  <span class="grid-desc">99건 조회 되었습니다.</span>
                </component-panel>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="Crop 확정">

          </b-tab-item>
          <b-tab-item label="Split">

          </b-tab-item>
          <b-tab-item label="Create Slug">

          </b-tab-item>
          <b-tab-item label="Send Slug">

          </b-tab-item>
          <b-tab-item label="GFA Mapping">

          </b-tab-item>
          <b-tab-item label="Orientation">

          </b-tab-item>
          <b-tab-item label="Process Out">

          </b-tab-item>
        </b-tabs>
      </component-panel>
    </section>
  </section>
</template>
<script src="./BaseForm07.script.js" />
<style src="./BaseForm07.scss" lang="scss" />
