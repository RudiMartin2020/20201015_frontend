<template>
  <section class="baseform03">
    <component-panel
      class="sel-date"
      :use-header="false"
    >
      <b-datepicker
        type="week"
        icon="calendar-today"
        v-model="from"
        editable
      />
    </component-panel>
    <component-panel
      class="sel-cond"
      :use-header="false"
    >
      <ul class="search-options">
        <li class="option-item">
          <span class="item-label">Work Week</span>
          <span class="item-input"><b-input value="2020/01/01 ~ 2020/03/31" /></span>
        </li>
        <li class="option-item">
          <span class="item-label">작업 Mode</span>
          <span class="item-input">
            <b-radio name="radio">입력</b-radio>
            <b-radio name="radio">삭제</b-radio>
            <b-radio name="radio">조회</b-radio>
          </span>
        </li>
      </ul>
    </component-panel>
    <component-panel
      class="sel-eqp"
      title="Grower List"
    />
    <component-panel
      class="sch-info-grid"
      title="Production Schedule Information"
    >
      <ul class="search-options">
        <li class="option-item">
          <span class="item-label">Schedule No</span>
          <span class="item-input sch">
            <b-input />
            <b-button
              type="is-dark"
              icon-left="magnify"
            />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Grower</span>
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
          <span class="item-label">Change(GM)</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item ">
          <span class="item-label">TQH/수율(%)</span>
          <span class="item-input sm">
            <b-input />
            <span class="unit">/</span>
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Poly</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">QZ-Crusible</span>
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
        <li class="option-item">
          <span class="item-label">품질 대기</span>
          <span class="item-input">
            <b-radio name="radio2">진행</b-radio>
            <b-radio name="radio2">대기</b-radio>
          </span>
        </li>
      </ul>
      <ul class="search-options">
        <li class="option-item">
          <span class="item-label">대기 사유</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">비고</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">필수 확인 사항</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
      </ul>
    </component-panel>
    <component-panel
      class="code-list add-grid-desc"
      title="MS Code List"
    >
      <div class="search-options">
        <span class="item-label">Prefix : </span>
        <span class="item-input">
          <b-input />
          <b-button
            type="is-dark"
            icon-left="magnify"
          />
        </span>
      </div>
      <div class="grid-wrap">
        <sk-grid
          ref="lotListGrid"
          :items-source="lotList"
          :initialized="initLotGrid"
          :use-checkbox="true"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span class="grid-desc">100 되었습니다.</span>
      </div>
    </component-panel>
    <component-panel
      class="sch-list-grid add-grid-desc"
      title="Production Schedule List"
    >
      <ul class="search-options">
        <li class="option-item">
          <span class="item-label">조회기간</span>
          <span class="item-input">
            <b-datepicker
              placeholder="from"
              icon="calendar-today"
              v-model="from"
              editable
            />
            <span class="unit">~</span>
            <b-datepicker
              placeholder="to"
              icon="calendar-today"
              v-model="to"
              editable
            />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">작업 Mode</span>
          <span class="item-input">
            <b-radio name="radio3">All</b-radio>
            <b-radio name="radio3">Lot Creation 전</b-radio>
            <b-radio name="radio3">Lot Creation 후</b-radio>
          </span>
        </li>
      </ul>
      <div class="grid-wrap">
        <sk-grid
          ref="lotListGrid"
          :items-source="lotList"
          :initialized="initLotGrid"
          :use-checkbox="true"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span class="grid-desc">100건 조회 되었습니다.</span>
      </div>
    </component-panel>
  </section>
</template>
<script src="./BaseForm03.script.js" />
<style src="./BaseForm03.scss" lang="scss" />
